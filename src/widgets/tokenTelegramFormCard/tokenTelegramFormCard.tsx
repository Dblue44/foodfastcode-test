import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shared/ui/card.tsx";
import { Button } from "@shared/ui/button.tsx";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@shared/ui/form.tsx";
import { Input } from "@shared/ui/input.tsx";
import type {TokenTelegramFormCardProps, TokenForm} from "./types.ts";
import {TokenFormSchema} from "./types.ts";


export function TokenTelegramFormCard(props: TokenTelegramFormCardProps) {
  const {
    value,
    onChange,
    onSubmit
  } = props;

  const form = useForm<TokenForm>({
    resolver: zodResolver(TokenFormSchema),
    defaultValues: { token: value ?? "" },
    values: useMemo(() => ({ token: value ?? "" }), [value]), // синк с родителем
    mode: "onChange",
  });

  const isSubmitting = form.formState.isSubmitting;

  const handleChange = (next: string) => {
    // Вызываем заглушку при изменении
    onChange(next);
    // Синхронизируем RHF контрол снаружи
    form.setValue("token", next, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
  };

  const handleSubmit = (data: TokenForm) => {
    // Необязательный внешний колбэк — тоже может быть заглушкой
    onSubmit?.(data.token);
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>{"Telegram бот"}</CardTitle>
        <CardDescription>{"Укажите токен вашего Telegram-бота. Его можно получить у "}
          <a
            href="https://t.me/BotFather"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 hover:text-primary/80"
          >
            @BotFather
          </a>.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Токен Telegram бота</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="1234567890:AA... (секретно)"
                      autoComplete="off"
                      value={field.value}
                      onChange={(e) => handleChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-2">
              <Button type="submit" disabled={isSubmitting || !form.formState.isValid}>
                {isSubmitting ? "Сохраняем…" : "Сохранить"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}