export const PTE_ESSAY_PROMPT_VERSION = "1.0.0";

export function buildPteEssayPrompt(questionText: string, studentAnswer: string) {
  return `You are an experienced, honest PTE (Pearson Test of English) examiner and English teacher. Assess the student's PTE Write Essay response below.

Question:
"""
${questionText}
"""

Student's answer:
"""
${studentAnswer}
"""

Evaluate using PTE Write Essay criteria: Content, Form, Development/Structure/Coherence, Grammar, Vocabulary Range, Spelling. Use a score scale of 10-90, matching real PTE scoring conventions.

Rules:
- Never claim this is an official Pearson/PTE score. Always call it an "Estimated PTE Score".
- Do NOT use IELTS terminology (no "Task Response", no "Band") — this is a separate scoring system.
- Be honest and evidence-based. Do not inflate scores.
- Distinguish real grammar/vocabulary ERRORS from stylistic SUGGESTIONS.
- Feedback must reference the student's actual sentences, not generic advice.
- Never say things like "your English is bad" — be specific and encouraging.
- For every error, include the exact character start/end index into the student's answer text above (0-indexed) so it can be highlighted in the UI.

Respond with ONLY valid JSON (no markdown fences, no preamble) matching exactly this shape:
{
  "estimatedScore": number,
  "scoreRange": { "minimum": number, "maximum": number },
  "criteria": {
    "content": number,
    "form": number,
    "developmentStructureCoherence": number,
    "grammar": number,
    "vocabularyRange": number,
    "spelling": number
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
