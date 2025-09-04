import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "@shared/lib";
import {updateUserPlace} from "@entities/place";
import {useEffect, useMemo} from "react";
import {useForm} from "react-hook-form";
import {type Place, storePlaceSchema} from "@shared/types";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {AlertCircleIcon} from "lucide-react";
import {Toaster} from "@shared/ui/sonner.tsx";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@shared/ui/card.tsx";
import {Button} from "@shared/ui/button.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@shared/ui/form.tsx";
import {Input} from "@shared/ui/input.tsx";
import type {PlaceSettingsProps} from "@features/place";

export function PlaceSettings({place}: PlaceSettingsProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const form = useForm<Place>({
    resolver: zodResolver(storePlaceSchema),
    defaultValues: { id: "", name: "", address: "", token: "" },
    mode: "onSubmit",
  });

  useEffect(() => {
    if (place) {
      form.reset({
        id: String(place.id),
        name: place.name ?? "",
        address: place.address ?? "",
        token: "",
      });
    }
  }, [place, form]);

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: Place) => {
    if (!values.id) return;

    const tokenFromForm = values.token?.trim();
    const token = tokenFromForm && tokenFromForm.length > 0
      ? tokenFromForm
      : (place?.token ?? "");

    if (!token) {
      toast.info("Укажите токен для бота", {
        icon: <AlertCircleIcon />,
        richColors: true,
      });
      return;
    }

    const payload: Place = {
      ...values,
      token,
    };

    const result = await dispatch(updateUserPlace(payload));
    if (updateUserPlace?.fulfilled?.match?.(result)) {
      navigate("/places", { replace: true });
      return;
    }
    const errorMessage = result.payload?.error || "Неизвестная ошибка";
    toast.error("Ошибка", {
      icon: <AlertCircleIcon />,
      richColors: true,
      description: "Не удалось сохранить изменения. " + errorMessage,
    });
  };

  const headerDesc = useMemo(
    () => (place ? `Отредактируйте данные заведения «${place.name}». Все поля обязательны.` : "Заведение не найдено."),
    [place]
  );

  if (!place) {
    return (
      <div className="w-full max-w-xl">
        <Toaster position="top-center" richColors />
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Заведение не найдено</CardTitle>
            <CardDescription>Проверьте корректность адреса страницы.</CardDescription>
          </CardHeader>
          <CardFooter className="px-6 pb-6">
            <Button onClick={() => navigate("/places")} className="ml-auto">К списку</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl">
      <Toaster position="top-center" richColors />
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Редактировать заведение</CardTitle>
          <CardDescription>{headerDesc}</CardDescription>
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
                      <Input placeholder="Введите название заведения" autoComplete="off" {...field} />
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
                      <Input placeholder="Город, улица, дом" autoComplete="off" {...field} />
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
                      <Input placeholder="(не обязателен для заполнения)" type="password" autoComplete="off" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CardFooter className="px-0">
                <Button type="submit" className="ml-auto" disabled={isSubmitting}>
                  {isSubmitting ? "Сохраняем…" : "Сохранить"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}