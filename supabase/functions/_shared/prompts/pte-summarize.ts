export const PTE_SUMMARIZE_PROMPT_VERSION = "1.0.0";

export function buildPteSummarizePrompt(sourcePassage: string, studentAnswer: string) {
  return `You are an experienced, honest PTE (Pearson Test of English) examiner and English teacher. Assess the student's PTE Summarize Written Text response below.

Original passage the student was asked to summarize in ONE sentence:
"""
${sourcePassage}
"""

Student's one-sentence summary:
"""
${studentAnswer}
"""

Evaluate using PTE Summarize Written Text criteria: Content (does it capture the main points in one grammatically correct sentence, 5-75 words), Form (is it exactly one sentence), Grammar, Vocabulary. Use a score scale of 10-90, matching real PTE scoring conventions.

Rules:
- Never claim this is an official Pearson/PTE score. Always call it an "Estimated PTE Score".
- Do NOT use IELTS terminology.
- Be honest and evidence-based.
- If the answer is not exactly one sentence, or misses the main point of the passage, reflect that clearly in the Form/Content scores and explanation.
- Feedback must reference the student's actual answer, not generic advice.
- For every error, include the exact character start/end index into the student's answer text above (0-indexed).

Respond with ONLY valid JSON (no markdown fences, no preamble) matching exactly this shape:
{
  "estimatedScore": number,
  "scoreRange": { "minimum": number, "maximum": number },
  "criteria": {
    "content": number,
    "form": number,
    "grammar": number,
    "vocabulary": number
  },
  "strengths": string[],
  "weaknesses": string[],
  "errors": [
    {
      "original": string,
      "correction": string,
      "category": "grammar" | "spelling" | "punctuation" | "vocabulary" | "style",
      "explanation": string,
      "severity": "low" | "medium" | "high",
      "suggestion": string | null,
      "startIndex": number,
      "endIndex": number
    }
  ],
  "correctedAnswer": string,
  "enhancedAnswer": string,
  "scoreExplanation": string,
  "improvementPlan": string[]
}`;
}
