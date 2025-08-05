import {z} from "zod";

export const loginFormPropsSchema = z.object({
  stage: z.enum(["phone", "otp"]),
  // теперь передаём формы вместо отдельных значений
  phoneForm: z.any().optional(), // UseFormReturn<PhoneForm>
  otpForm: z.any().optional(), // UseFormReturn<OtpForm>
  onPhoneSubmit: z
    .function()
    .args(z.any())
    .returns(z.void()),
  onOtpSubmit: z
    .function()
    .args(z.any())
    .returns(z.void()),
  isSubmitting: z.boolean().optional(),
  onResetPhone: z.function().args().returns(z.void()).optional(),
  phoneInputRef: z.any().optional(),
  className: z.string().optional(),
});

export type LoginFormProps = z.infer<typeof loginFormPropsSchema>;

export function parseLoginFormProps(raw: unknown): LoginFormProps {
  return loginFormPropsSchema.parse(raw); // кинет ошибку, если невалидно
}

export function safeParseLoginFormProps(raw: unknown) {
  return loginFormPropsSchema.safeParse(raw);
}