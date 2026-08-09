import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/lib/AuthContext";
import type { ExamQuestion, WritingSubmission } from "@/types/writing";

function formatTime(totalSeconds: number) {
  const clamped = Math.max(0, totalSeconds);
  const m = Math.floor(clamped / 60);
  const s = clamped % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function countWords(text: string) {
  const trimmed = text.trim();
  return trimmed.length === 0 ? 0 : trimmed.split(/\s+/).length;
}

const TASK_LABELS: Record<string, string> = {
  "IELTS:task1": "IELTS Academic Writing Task 1",
  "IELTS:task2": "IELTS Academic Writing Task 2",
  "PTE:write_essay": "PTE Write Essay",
  "PTE:summarize_text": "PTE Summarize Written Text",
};

const ANALYSIS_FUNCTION: Record<string, string> = {
  IELTS: "analysis-ielts",
  PTE: "analysis-pte",
};

export default function WritingEditor() {
  const { examType, taskType } = useParams<{ examType: string; taskType: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [question, setQuestion] = useState<ExamQuestion | null>(null);
  const [submission, setSubmission] = useState<WritingSubmission | null>(null);
  const [answer, setAnswer] = useState("");
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!user || !examType || !taskType) return;

    async function init() {
      const { data: questions } = await supabase
        .from("exam_questions")
        .select("*")
        .eq("exam_type", examType)
        .eq("task_type", taskType)
        .limit(1);

      const q = questions?.[0] as ExamQuestion | undefined;
      if (!q) {
        setLoading(false);
        return;
      }
      setQuestion(q);

      const { data: existing } = await supabase
        .from("writing_submissions")
        .select("*")
        .eq("user_id", user!.id)
        .eq("question_id", q.id)
        .eq("status", "draft")
        .order("created_at", { ascending: false })
        .limit(1);

      let current = existing?.[0] as WritingSubmission | undefined;

      if (!current) {
        const { data: created } = await supabase
          .from("writing_submissions")
          .insert({
            user_id: user!.id,
            question_id: q.id,
            exam_type: q.exam_type,
            task_type: q.task_type,
            mode: "practice",
            answer_text: "",
            word_count: 0,
            started_at: new Date().toISOString(),
          })
          .select()
          .single();
        current = created as WritingSubmission;
      }

      setSubmission(current ?? null);
      setAnswer(current?.answer_text ?? "");

      const startedAtMs = new Date(current!.started_at).getTime();
      const elapsed = Math.floor((Date.now() - startedAtMs) / 1000);
      setRemainingSeconds(q.time_limit_seconds - elapsed);

      setLoading(false);
    }

    init();
  }, [user, examType, taskType]);

  useEffect(() => {
    if (!submission || !question) return;
    const startedAtMs = new Date(submission.started_at).getTime();

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startedAtMs) / 1000);
      setRemainingSeconds(question.time_limit_seconds - elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [submission, question]);

  function handleChange(text: string) {
    setAnswer(text);
    setSaveState("idle");

    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => saveDraft(text), 1000);
  }

  async function saveDraft(text: string) {
    if (!submission) return;
    setSaveState("saving");
    await supabase
      .from("writing_submissions")
      .update({ answer_text: text, word_count: countWords(text) })
      .eq("id", submission.id);
    setSaveState("saved");
  }

  async function handleSubmit() {
    if (!submission || !examType) return;
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    setSubmitting(true);
    setSubmitError(null);

    await supabase
      .from("writing_submissions")
      .update({
        answer_text: answer,
        word_count: countWords(answer),
        status: "submitted",
        submitted_at: new Date().toISOString(),
      })
      .eq("id", submission.id);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    const functionName = ANALYSIS_FUNCTION[examType] ?? "analysis-ielts";

    const { data, error } = await supabase.functions.invoke(functionName, {
      body: { submissionId: submission.id },
      headers: { Authorization: `Bearer ${session?.access_token}` },
    });

    setSubmitting(false);

    if (error || !data?.analysisId) {
      setSubmitError("Unable to analyse your response right now. Please try again.");
      return;
    }

    navigate(`/report/${submission.id}`);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500 text-sm">Loading question...</p>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 text-center">
        <p className="text-slate-500 text-sm">
          No question found for this task. Make sure the matching migration has been run.
        </p>
      </div>
    );
  }

  const words = countWords(answer);
  const belowMinimum = question.recommended_min_words != null && words < question.recommended_min_words;
  const taskLabel = TASK_LABELS[`${examType}:${taskType}`] ?? `${examType} ${taskType}`;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-500">{taskLabel}</span>
          <span
            className={`text-sm font-mono ${remainingSeconds <= 60 ? "text-red-600" : "text-slate-700"}`}
          >
            Time remaining: {formatTime(remainingSeconds)}
          </span>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-3">
          <p className="text-slate-800">{question.prompt_text}</p>
          {question.source_passage && (
            <div className="border-t border-slate-100 pt-3">
              <p className="text-xs font-medium text-slate-400 mb-1">PASSAGE</p>
              <p className="text-sm text-slate-600">{question.source_passage}</p>
            </div>
          )}
        </div>

        <textarea
          value={answer}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Start writing your answer here"
          className="w-full h-80 rounded-xl border border-slate-300 p-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 resize-none"
        />

        <div className="flex items-center justify-between text-sm">
          <span className={belowMinimum ? "text-amber-600" : "text-slate-500"}>
            Words: {words}
            {question.recommended_min_words != null &&
              ` (recommended minimum: ${question.recommended_min_words})`}
          </span>
          <span className="text-slate-400">
            {saveState === "saving" && "Saving..."}
            {saveState === "saved" && "Draft saved"}
          </span>
        </div>

        {belowMinimum && (
          <p className="text-sm text-amber-600">
            You're under the recommended word count — you can still submit, but examiners may
            penalize answers this short.
          </p>
        )}

        {submitError && <p className="text-sm text-red-600">{submitError}</p>}

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full rounded-md bg-slate-800 text-white py-2 text-sm font-medium hover:bg-slate-700 disabled:opacity-50"
        >
          {submitting ? "Analysing..." : "Submit for AI Assessment"}
        </button>
      </div>
    </div>
  );
}
