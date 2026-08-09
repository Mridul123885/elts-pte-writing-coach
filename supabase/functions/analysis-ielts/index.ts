import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";
import { buildIeltsTask1Prompt, IELTS_TASK1_PROMPT_VERSION } from "../_shared/prompts/ielts-task1.ts";
import { buildIeltsTask2Prompt, IELTS_TASK2_PROMPT_VERSION } from "../_shared/prompts/ielts-task2.ts";
import { ieltsAnalysisSchema } from "../_shared/schemas/ielts-analysis.ts";
import { callAiJson, AI_MODEL } from "../_shared/aiClient.ts";
import { checkDailyLimit } from "../_shared/rateLimiter.ts";

const MAX_CHARS = Number(Deno.env.get("MAX_SUBMISSION_CHARACTERS") ?? "6000");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return jsonResponse({ error: "Missing Authorization header" }, 401);

    // Client scoped to the caller's own JWT — respects RLS for reads/writes
    // that should be user-scoped; we use the service role only where the
    // policy intentionally requires it (writing_analysis/writing_errors inserts).
    const supabaseUser = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const {
      data: { user },
      error: userError,
    } = await supabaseUser.auth.getUser();
    if (userError || !user) return jsonResponse({ error: "Invalid or expired session" }, 401);

    const { submissionId } = await req.json();
    if (!submissionId) return jsonResponse({ error: "submissionId is required" }, 400);

    const { data: submission, error: subError } = await supabaseUser
      .from("writing_submissions")
      .select("*, exam_questions(prompt_text, source_passage)")
      .eq("id", submissionId)
      .eq("user_id", user.id)
      .single();

    if (subError || !submission) return jsonResponse({ error: "Submission not found" }, 404);

    if (submission.answer_text.length > MAX_CHARS) {
      return jsonResponse({ error: `Answer exceeds ${MAX_CHARS} character limit` }, 400);
    }

    const limitCheck = await checkDailyLimit(supabaseUser, user.id);
    if (!limitCheck.allowed) {
      return jsonResponse(
        { error: `Daily AI assessment limit reached (${limitCheck.limit}/day). Try again tomorrow.` },
        429
      );
    }

    // IELTS has two distinct tasks with different criteria (Task Achievement
    // vs Task Response) — kept as separate prompts, same as PTE's two tasks.
    let prompt: string;
    let promptVersion: string;

    if (submission.task_type === "task1") {
      prompt = buildIeltsTask1Prompt(
        submission.exam_questions?.prompt_text ?? "",
        submission.exam_questions?.source_passage ?? "",
        submission.answer_text
      );
      promptVersion = `ielts-task1@${IELTS_TASK1_PROMPT_VERSION}`;
    } else {
      const questionText = submission.exam_questions?.prompt_text ?? "";
      prompt = buildIeltsTask2Prompt(questionText, submission.answer_text);
      promptVersion = `ielts-task2@${IELTS_TASK2_PROMPT_VERSION}`;
    }

    let parsed;
    let lastError: unknown;

    // One retry if the model returns malformed JSON — fail gracefully after that.
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const raw = await callAiJson(prompt);
        const json = JSON.parse(raw);
        parsed = ieltsAnalysisSchema.parse(json);
        break;
      } catch (err) {
        lastError = err;
      }
    }

    if (!parsed) {
      console.error("AI response validation failed:", lastError);
      return jsonResponse(
        { error: "Unable to analyse your response right now. Please try again." },
        502
      );
    }

    // Service role client to write analysis rows, since writing_analysis has
    // no client-facing insert policy (writes are function-only by design).
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: analysis, error: analysisError } = await supabaseAdmin
      .from("writing_analysis")
      .insert({
        submission_id: submissionId,
        estimated_score: parsed.estimatedScore,
        score_min: parsed.scoreRange.minimum,
        score_max: parsed.scoreRange.maximum,
        criteria: parsed.criteria,
        strengths: parsed.strengths,
        weaknesses: parsed.weaknesses,
        corrected_answer: parsed.correctedAnswer,
        enhanced_answer: parsed.enhancedAnswer,
        score_explanation: parsed.scoreExplanation,
        improvement_plan: parsed.improvementPlan,
        prompt_version: promptVersion,
        model_used: AI_MODEL,
      })
      .select()
      .single();

    if (analysisError) throw analysisError;

    if (parsed.errors.length > 0) {
      const { error: errorsInsertError } = await supabaseAdmin.from("writing_errors").insert(
        parsed.errors.map((e) => ({
          analysis_id: analysis.id,
          original_text: e.original,
          corrected_text: e.correction,
          category: e.category,
          explanation: e.explanation,
          severity: e.severity,
          suggestion: e.suggestion,
          start_index: e.startIndex,
          end_index: e.endIndex,
        }))
      );
      if (errorsInsertError) throw errorsInsertError;
    }

    // Denormalized row for fast progress charts
    await supabaseAdmin.from("score_history").insert({
      user_id: user.id,
      exam_type: submission.exam_type,
      task_type: submission.task_type,
      estimated_score: parsed.estimatedScore,
    });

    return jsonResponse({ analysisId: analysis.id });
  } catch (err) {
    console.error("analysis-ielts error:", err);
    return jsonResponse(
      { error: "Unable to analyse your response right now. Please try again." },
      500
    );
  }
});
