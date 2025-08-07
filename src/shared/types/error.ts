import { z } from "zod";

export const errorTypeSchema = z.object({
  message: z.string(),
  response: z.object({
    data: z.object({
      error: z.string().optional(),
    }).optional(),
  }),
  isAuthError: z.boolean().optional(),
});

export type ErrorType = z.infer<typeof errorTypeSchema>;

export const errorLineTypeSchema = z.object({
  message: z.string(),
  response: z.string().optional(),
  error: z.string().optional(),
  isAuthError: z.boolean().optional(),
})

export type ErrorLineType = z.infer<typeof errorLineTypeSchema>;
