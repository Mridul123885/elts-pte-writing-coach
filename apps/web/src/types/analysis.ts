export interface WritingError {
  id: string;
  original_text: string;
  corrected_text: string;
  category: string;
  explanation: string;
  severity: "low" | "medium" | "high";
  suggestion: string | null;
  start_index: number | null;
  end_index: number | null;
}

export interface WritingAnalysis {
  id: string;
  submission_id: string;
  estimated_score: number;
  score_min: number | null;
  score_max: number | null;
  // Generic to support both IELTS (fixed 4 criteria) and PTE (varies by task type)
  criteria: Record<string, number>;
  strengths: string[];
  weaknesses: string[];
  corrected_answer: string | null;
  enhanced_answer: string | null;
  score_explanation: string | null;
  improvement_plan: string[] | null;
}
