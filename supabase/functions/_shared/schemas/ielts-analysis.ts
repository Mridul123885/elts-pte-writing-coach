import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

export const errorSchema = z.object({
  original: z.string(),
  correction: z.string(),
  category: z.enum(["grammar", "spelling", "punctuation", "vocabulary", "style"]),
  explanation: z.string(),
  severity: z.enum(["low", "medium", "high"]),
  suggestion: z.string().nullable(),
  startIndex: z.number().int(),
  endIndex: z.number().int(),
});

export const ieltsAnalysisSchema = z.object({
  estimatedScore: z.number(),
  scoreRange: z.object({ minimum: z.number(), maximum: z.number() }),
  criteria: z.object({
    taskResponse: z.number(),
    coherenceCohesion: z.number(),
    lexicalResource: z.number(),
    grammaticalRangeAccuracy: z.number(),
  }),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  errors: z.array(errorSchema),
  correctedAnswer: z.string(),
  enhancedAnswer: z.string(),
  scoreExplanation: z.string(),
  improvementPlan: z.array(z.string()),
});

export type IeltsAnalysis = z.infer<typeof ieltsAnalysisSchema>;
