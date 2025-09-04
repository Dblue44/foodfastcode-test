import { z } from "zod";

export const TokenTelegramFormCardPropsSchema = z.object({
  value: z.string(),
  onChange: z.function().args(z.string()).returns(z.void()),
  onSubmit: z.function().args(z.string()).returns(z.void()).optional(),
})

export type TokenTelegramFormCardProps = z.infer<typeof TokenTelegramFormCardPropsSchema>

export const TokenFormSchema = z.object({
  token: z.string().min(1, "Укажите токен Telegram бота"),
});

export type TokenForm = z.infer<typeof TokenFormSchema>;