import {z} from "zod";

export const userStateSchema = z.object({
  id: z.string().nullable(),
  name: z.string().nullable(),
  phone: z.string().nullable(),
  username: z.string().nullable(),
  telegramId: z.string().nullable(),
  createdAt: z.string().nullable(),
  updatedAt: z.string().nullable(),
  avatarUrl: z.string().nullable(),
})

export type UserState = z.infer<typeof userStateSchema>

export const userStateResponseSchema = z.object({
  data: userStateSchema
})

export type UserStateResponse = z.infer<typeof userStateResponseSchema>

export const iUserStateSchema = userStateSchema.extend({
  accessToken: z.string().nullable(),
  error: z.string().optional().nullable(),
  authClosed: z.boolean(),
  currentPage: z.string(),
})

export type IUserState = z.infer<typeof iUserStateSchema>

export const phoneFormSchema = z.object({
  phone: z
    .string()
    .transform((val) => val.replace(/\D/g, "")) // только цифры
    .refine((v) => /^7\d{10}$/.test(v), {
      message: "Ожидается формат: +7 (999) 999-99-99.",
    }),
});

export type PhoneForm = z.infer<typeof phoneFormSchema>;

export const otpFormSchema = z.object({
  code: z.string().min(4, {
    message: "Заполните все ячейки",
  }),
})

export type OtpForm = z.infer<typeof otpFormSchema>

export const loginOtpSchema = phoneFormSchema.merge(otpFormSchema)

export type LoginOtp = z.infer<typeof loginOtpSchema>

export const userSendCodeData = z.object({
  data: z.string().optional(),
})

export type UserSendCodeData = z.infer<typeof userSendCodeData>

export const userAccessCodeData = z.object({
  data: z.object({
    access_token: z.string(),
  }),
})

export type UserAccessCodeData = z.infer<typeof userAccessCodeData>

export const rejectedSsoTypeSchema = z.object({
  error: z.string(),
  isAuthError: z.boolean().optional(),
})

export type RejectedSsoType = z.infer<typeof rejectedSsoTypeSchema>
