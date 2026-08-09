import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import type { WritingAnalysis, WritingError } from "@/types/analysis";

const CRITERIA_LABELS: Record<string, string> = {
  taskResponse: "Task Response",
  taskAchievement: "Task Achievement",
  coherenceCohesion: "Coherence & Cohesion",
  lexicalResource: "Lexical Resource",
  grammaticalRangeAccuracy: "Grammatical Range & Accuracy",
  content: "Content",
  form: "Form",
  developmentStructureCoherence: "Development, Structure & Coherence",
  grammar: "Grammar",
  vocabularyRange: "Vocabulary Range",
  vocabulary: "Vocabulary",
  spelling: "Spelling",
};

const SEVERITY_STYLES: Record<string, string> = {
  low: "bg-amber-50 text-amber-700 border-amber-200",
  medium: "bg-orange-50 text-orange-700 border-orange-200",
  high: "bg-red-50 text-red-700 border-red-200",
};

export default function ScoreReport() {
  const { submissionId } = useParams();
  const [analysis, setAnalysis] = useState<WritingAnalysis | null>(null);
  const [errors, setErrors] = useState<WritingError[]>([]);
  const [examType, setExamType] = useState<"IELTS" | "PTE" | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!submissionId) return;

    async function load() {
      const { data: submissionData } = await supabase
        .from("writing_submissions")
        .select("exam_type")
        .eq("id", submissionId)
        .single();

      if (submissionData) setExamType(submissionData.exam_type);

      const { data: analysisData } = await supabase
        .from("writing_analysis")
        .select("*")
        .eq("submission_id", submissionId)
        .maybeSingle();

      if (!analysisData) {
        setFailed(true);
        setLoading(false);
        return;
      }

      setAnalysis(analysisData as WritingAnalysis);

      const { data: errorData } = await supabase
        .from("writing_errors")
        .select("*")
        .eq("analysis_id", analysisData.id);

      setErrors((errorData ?? []) as WritingError[]);
      setLoading(false);
    }

    load();
  }, [submissionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500 text-sm">Analysing your writing...</p>
      </div>
    );
  }

  if (failed || !analysis) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center gap-4">
        <p className="text-slate-600">Unable to analyse your response right now. Please try again.</p>
        <Link to="/" className="text-slate-800 underline text-sm">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <p className="text-sm text-slate-500">
            {examType === "PTE" ? "Estimated PTE Score" : "Estimated IELTS Band"}
          </p>
          <p className="text-5xl font-semibold text-slate-800">{analysis.estimated_score}</p>
          {analysis.score_min != null && analysis.score_max != null && (
            <p className="text-xs text-slate-400 mt-1">
              Range: {analysis.score_min}–{analysis.score_max}
            </p>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100">
          {Object.entries(analysis.criteria).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-slate-600">{CRITERIA_LABELS[key] ?? key}</span>
              <span className="text-sm font-medium text-slate-800">{value}</span>
            </div>
          ))}
        </div>

        {analysis.score_explanation && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <h2 className="text-sm font-semibold text-slate-700 mb-2">Why this score</h2>
            <p className="text-sm text-slate-600 whitespace-pre-line">{analysis.score_explanation}</p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <h2 className="text-sm font-semibold text-emerald-700 mb-2">What You Did Well</h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
            {analysis.strengths.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <h2 className="text-sm font-semibold text-red-700 mb-2">What Is Reducing Your Score</h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
            {analysis.weaknesses.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>

        {analysis.improvement_plan && analysis.improvement_plan.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <h2 className="text-sm font-semibold text-slate-700 mb-2">How To Reach The Next Band</h2>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
              {analysis.improvement_plan.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        )}

        {errors.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-3">
            <h2 className="text-sm font-semibold text-slate-700">Detailed Errors ({errors.length})</h2>
            {errors.map((err) => (
              <div key={err.id} className={`border rounded-lg p-3 text-sm ${SEVERITY_STYLES[err.severity]}`}>
                <p className="line-through opacity-70">{err.original_text}</p>
                <p className="font-medium">{err.corrected_text}</p>
                <p className="mt-1 text-xs opacity-80">{err.explanation}</p>
              </div>
            ))}
          </div>
        )}

        {analysis.corrected_answer && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <h2 className="text-sm font-semibold text-slate-700 mb-2">Corrected Version</h2>
            <p className="text-sm text-slate-600 whitespace-pre-line">{analysis.corrected_answer}</p>
          </div>
        )}

        {analysis.enhanced_answer && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <h2 className="text-sm font-semibold text-slate-700 mb-2">Enhanced Version</h2>
            <p className="text-sm text-slate-600 whitespace-pre-line">{analysis.enhanced_answer}</p>
          </div>
        )}

        <Link to="/" className="block text-center text-sm text-slate-500 underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
