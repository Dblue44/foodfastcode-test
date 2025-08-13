import {LoginForm} from "@widgets/login"
import {useState} from "react"
import {useMask} from "@react-input/mask"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import type {LoginOtp, OtpForm, PhoneForm} from "@shared/types"
import {otpFormSchema, phoneFormSchema} from "@shared/types"
import {useAppDispatch} from "@shared/lib"
import {checkCode, getUser, sendCode} from "@entities/user"
import { toast } from "sonner"
import {AlertCircleIcon} from "lucide-react";
import {Toaster} from "@shared/ui/sonner";
import {useNavigate} from "react-router-dom";

export const AuthPage = () => {
  const [stage, setStage] = useState<"phone" | "otp">("phone")
  const [phone, setPhone] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const phoneForm = useForm<PhoneForm>({
    resolver: zodResolver(phoneFormSchema),
    defaultValues: { phone: "" },
  })

  const otpForm = useForm<OtpForm>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: { code: "" },
  })

  const inputPhoneRef = useMask({
    mask: "+7 (___) ___-__-__",
    replacement: { _: /\d/ }
  })

  const handlePhoneSubmit = async (data: PhoneForm) => {
    setIsSubmitting(true)
    try {
      data.phone = "+" + data.phone
      const result = await dispatch(sendCode(data))
      if (sendCode.rejected.match(result)) {
        toast.error("Ошибка при отправке телефона", {
          icon: <AlertCircleIcon />,
          richColors: true,
          description: result.payload?.error || "Не удалось отправить код подтверждения",
        });
        return
      }
      setStage("otp")
      setPhone(data.phone)
      toast.info("Код отправлен", {
        description: "На ваш номер телефона отправлен код подтверждения в Telegram",
      });
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOtpSubmit = async (data: OtpForm) => {
    setIsSubmitting(true)
    try {
      if (!phone) {
        resetToPhone()
        return
      }
      const loginOtp: LoginOtp = {
        phone,
        code: data.code,
      }
      const result = await dispatch(checkCode(loginOtp))
      if (checkCode.rejected.match(result)) {
        toast.error("Ошибка при отправке кода", {
          description: result.payload?.error || "Не удалось отправить код подтверждения",
        });
        return;
      }
      if (checkCode.fulfilled.match(result)) {
        setShowForm(false);
        await dispatch(getUser())
        navigate("/home")
      }
    } finally {
      setIsSubmitting(false)
    }

  }

  const resetToPhone = () => {
    setStage("phone")
    otpForm.reset()
  }

  return (
    <div className="w-full max-w-sm px-4">
      <Toaster position="top-center" richColors />
      {showForm ? <LoginForm
        stage={stage}
        phoneForm={phoneForm}
        otpForm={otpForm}
        onPhoneSubmit={handlePhoneSubmit}
        onOtpSubmit={handleOtpSubmit}
        isSubmitting={isSubmitting}
        onResetPhone={resetToPhone}
        phoneInputRef={inputPhoneRef}
      /> : null}
    </div>
  )
}