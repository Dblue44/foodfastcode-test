import { usePageCrumbs } from "@/features";
import {useAppDispatch} from "@shared/lib";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {type CreatePlaceForm, createPlaceFormSchema} from "@shared/types";
import {toast} from "sonner";
import {createUserPlace} from "@entities/place";
import {AlertCircleIcon} from "lucide-react";
import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "@shared/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@shared/ui/form";
import {Input} from "@shared/ui/input";
import {Button} from "@shared/ui/button";
import {Toaster} from "@shared/ui/sonner.tsx";


export function CreatePlacePage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  usePageCrumbs("Добавление заведения");

  const form = useForm<CreatePlaceForm>({
    resolver: zodResolver(createPlaceFormSchema),
    defaultValues: { name: "", address: "", token: "" },
    mode: "onSubmit",
  })

  const isSubmitting = form.formState.isSubmitting

  const onSubmit = async (values: CreatePlaceForm) => {
    const result = await dispatch(createUserPlace(values))
    if (createUserPlace.fulfilled?.match?.(result)) {
      navigate("/places", { replace: true })
      return
    }
    const errorMessage = result.payload?.error || "Неизвестная ошибка"
    toast.error("Ошибка", {
      icon: <AlertCircleIcon />,
      richColors: true,
      description: "Не удалось создать новое заведение. " + errorMessage,
    })
  }

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <Toaster position="top-center" richColors />
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Добавить новое заведение</CardTitle>
          <CardDescription>"Укажите данные заведения. Все поля обязательны."</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Введите название заведения"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Адрес</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Город, улица, дом"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="token"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Токен Telegram бота</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123456789:ABCDEF…"
                        type="password"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CardFooter className="px-0">
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                  Назад
                </Button>
                <Button type="submit" className="ml-auto" disabled={isSubmitting}>
                  {isSubmitting ? "Создаём…" : "Создать"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}