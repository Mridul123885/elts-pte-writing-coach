export interface ExamQuestion {
  id: string;
  exam_type: "IELTS" | "PTE";
  task_type: string;
  prompt_text: string;
  source_passage: string | null;
  time_limit_seconds: number;
  recommended_min_words: number | null;
}

export interface WritingSubmission {
  id: string;
  user_id: string;
  question_id: string | null;
  exam_type: "IELTS" | "PTE";
  task_type: string;
  mode: "practice" | "exam";
  answer_text: string;
  word_count: number;
  status: "draft" | "submitted";
  started_at: string;
  submitted_at: string | null;
}
