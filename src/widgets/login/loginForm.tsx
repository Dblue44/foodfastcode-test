import {GalleryVerticalEnd} from "lucide-react"
import {cn} from "@shared/lib";
import {Input} from "@shared/ui/input";
import {Button} from "@shared/ui/button";
import {TelegramCode} from "@shared/ui/telegram-сode";
import {InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot} from "@shared/ui/input-otp";
import type {LoginFormProps} from "@widgets/login/types";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@shared/ui/form";
import React from "react";

function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(value);
      } else if (typeof ref === "object" && "current" in ref) {
        ref.current = value;
      }
    });
  };
}

export function LoginForm({
  stage,
  phoneForm,
  otpForm,
  onPhoneSubmit,
  onOtpSubmit,
  isSubmitting = false,
  onResetPhone,
  phoneInputRef,
  className,
  ...props
}: LoginFormProps & React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-6"/>
          </div>
          <span className="sr-only">FastFootCode</span>
          <h1 className="text-xl font-bold">Добро пожаловать в FoodFastCode</h1>
          <div className="flex items-center text-center text-sm">
            <span className="mr-4">Нет аккаунта?{" "}</span>
            <TelegramCode/>
          </div>
        </div>
        {stage === "phone" && phoneForm && (
          <Form {...phoneForm}>
            <form
              onSubmit={phoneForm.handleSubmit(onPhoneSubmit)}
              noValidate
              className="flex flex-col gap-6"
            >
              <div className="grid gap-3">
                <FormField
                  control={phoneForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={"mb-2"}>Телефон</FormLabel>
                      <FormControl>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+7 (123) 456-78-90"
                          required
                          aria-invalid={!!phoneForm.formState.errors.phone}
                          aria-describedby={
                            phoneForm.formState.errors.phone ? "phone-error" : undefined
                          }
                          {...field}
                          ref={mergeRefs(field.ref, phoneInputRef)}
                        />
                      </FormControl>
                      <FormDescription className={"mt-2"}>
                        Введите свой номер телефона
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                Войти
              </Button>
            </form>
          </Form>
        )}

        {stage === "otp" && otpForm && (
          <Form {...otpForm}>
            <form
              onSubmit={otpForm.handleSubmit(onOtpSubmit)}
              className="flex flex-col gap-6"
              noValidate
            >
              <FormField
                control={otpForm.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center mb-2">
                      <FormLabel>Код подтверждения</FormLabel>
                      {onResetPhone && (
                        <Button
                          type="button"
                          variant="ghost"
                          className="text-sm underline"
                          onClick={onResetPhone}
                        >
                          Изменить номер
                        </Button>
                      )}
                    </div>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription className={"mt-4"}>
                      Введите код подтверждения из Telegram бота
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                Войти
              </Button>
            </form>
          </Form>
        )}
      </div>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        Нажав "Войти", вы соглашаетесь с нашими условиями.
        <br />
        <a href="#">Условия сервиса</a>. <a href="#">Политика безопасности</a>.
      </div>
    </div>
  )
}