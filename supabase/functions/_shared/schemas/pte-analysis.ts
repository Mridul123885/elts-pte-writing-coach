import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

export const pteErrorSchema = z.object({
  original: z.string(),
  correction: z.string(),
  category: z.enum(["grammar", "spelling", "punctuation", "vocabulary", "style"]),
  explanation: z.string(),
  severity: z.enum(["low", "medium", "high"]),
  suggestion: z.string().nullable(),
  startIndex: z.number().int(),
  endIndex: z.number().int(),
});

export const pteAnalysisSchema = z.object({
  estimatedScore: z.number(),
  scoreRange: z.object({ minimum: z.number(), maximum: z.number() }),
  criteria: z.record(z.string(), z.number()),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  errors: z.array(pteErrorSchema),
  correctedAnswer: z.string(),
  enhancedAnswer: z.string(),
  scoreExplanation: z.string(),
  improvementPlan: z.array(z.string()),
});

export type PteAnalysis = z.infer<typeof pteAnalysisSchema>;
