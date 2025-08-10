import {useEffect, useMemo} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "@shared/lib";
import {setPageName} from "@entities/user";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {type IPlace, storePlaceSchema} from "@shared/types";
import {toast} from "sonner";
import {AlertCircleIcon} from "lucide-react";
import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "@shared/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@shared/ui/form";
import {Input} from "@shared/ui/input";
import {Button} from "@shared/ui/button";
import {Toaster} from "@shared/ui/sonner.tsx";
import {selectPlacesList, updateUserPlace} from "@entities/places";

export function EditPlacePage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const places = useAppSelector(selectPlacesList);
  const place = useMemo(() => places?.find(p => String(p.id) === String(id)), [places, id]);

  const form = useForm<IPlace>({
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

  const onSubmit = async (values: IPlace) => {
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

    const payload: IPlace = {
      ...values,
      token,
    };

    const result = await dispatch(updateUserPlace(payload));
    if (updateUserPlace?.fulfilled?.match?.(result)) {
      navigate("/places", { replace: true });
      return;
    }
    const errorMessage = result?.payload?.error || "Неизвестная ошибка";
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

  useEffect(() => {
    dispatch(setPageName("Редактирование заведения"));
  }, [dispatch]);

  if (!place) {
    return (
      <div className="w-full max-w-xl mx-auto px-4">
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
    <div className="w-full max-w-xl mx-auto px-4">
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
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                  Назад
                </Button>
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
