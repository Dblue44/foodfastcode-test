import { z } from "zod";

export const errorTypeSchema = z.object({
  message: z.string(),
  response: z.object({
    data: z.object({
      error: z.string().optional(),
    }).optional(),
  }),
});

export type ErrorType = z.infer<typeof errorTypeSchema>;