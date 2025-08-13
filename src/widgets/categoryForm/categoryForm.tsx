import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@shared/ui/form.tsx";
import {Input} from "@shared/ui/input.tsx";
import {CardFooter} from "@shared/ui/card.tsx";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@shared/ui/dialog.tsx";
import {Button} from "@shared/ui/button.tsx";
import {useForm} from "react-hook-form";
import {categoryFormTypeSchema, type CategoryFormType} from "@shared/types";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {AlertCircleIcon, CheckIcon} from "lucide-react";
import {createUserPlaceCategory, editUserPlaceCategory, extendCategoryList, replaceCategoryInList} from "@entities/category";
import {useAppDispatch} from "@shared/lib";
import type {CategoryFormProps} from "@widgets/categoryForm";
import {useEffect, useMemo} from "react";

export function CategoryForm({category, setOpen, open, title, mode}: CategoryFormProps) {
  const dispatch = useAppDispatch()

  const form = useForm<CategoryFormType>({
    resolver: zodResolver(categoryFormTypeSchema),
    defaultValues: {name: category?.name ?? ""},
    mode: "onSubmit",
  })

  const isSubmitting = form.formState.isSubmitting

  const onSubmit = async (values: CategoryFormType) => {
    if (mode === "edit" && category?.id) {
      const data = { id: category.id, name: values.name }
      const result = await dispatch(editUserPlaceCategory(data))
      if (editUserPlaceCategory.rejected.match?.(result)) {
        const errorMessage = result?.payload?.error || "Неизвестная ошибка"
        toast.error("Ошибка при изменении категории", {
          icon: <AlertCircleIcon/>,
          richColors: true,
          description: "Не удалось изменить категорию. " + errorMessage,
        })
      }
      if (editUserPlaceCategory.fulfilled.match(result)) {
        const updateData = {...data, placeId: category.placeId}
        dispatch(replaceCategoryInList(updateData))
      }
      toast("Категория успешно изменена", { icon: <CheckIcon /> });
      setOpen(false);
      return
    }
    const result = await dispatch(createUserPlaceCategory(values.name))
    if (createUserPlaceCategory.rejected.match?.(result)) {
      const errorMessage = result?.payload?.error || "Неизвестная ошибка"
      toast.error("Ошибка при создании категории", {
        icon: <AlertCircleIcon/>,
        richColors: true,
        description: "Не удалось добавить категорию. " + errorMessage,
      })
    }
    if (createUserPlaceCategory.fulfilled.match(result)) {
      const newId = result.payload.data.id
      if (newId) {
        dispatch(extendCategoryList(result.payload.data))
      }
      toast("Категория успешно добавлена", { icon: <CheckIcon /> });
      setOpen(false);
    }
  }

  useEffect(() => {
    if (open) {
      form.reset({ name: category?.name ?? "" })
    }
  }, [open, category, form])

  const computedTitle = useMemo(
    () => title ?? (mode === "edit" ? "Изменение категории" : "Добавление категории"),
    [mode, title]
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{computedTitle}</DialogTitle>
        </DialogHeader>
        <div className="w-full max-w-xl mx-auto px-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Название</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Введите название категории"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />

              <CardFooter className="px-0">
                <DialogClose asChild>
                  <Button variant="outline">Закрыть</Button>
                </DialogClose>
                <Button type="submit" className="ml-auto" disabled={isSubmitting}>
                  {isSubmitting ? "Сохраняем…" : (mode === "edit" ? "Сохранить" : "Создать")}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}