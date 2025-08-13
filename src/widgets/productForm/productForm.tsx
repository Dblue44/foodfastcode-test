import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@shared/ui/form.tsx";
import {Input} from "@shared/ui/input.tsx";
import {CardFooter} from "@shared/ui/card.tsx";
import type {CreateProductFormProps} from "@widgets/productForm";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {type ProductFormType, productFormSchema} from "@shared/types";
import {Switch} from "@shared/ui/switch.tsx";
import {DialogClose} from "@shared/ui/dialog.tsx";
import {Button} from "@shared/ui/button.tsx";
import {Textarea} from "@shared/ui/textarea.tsx";

export function ProductForm({onSubmit, category}: CreateProductFormProps) {

  const form = useForm<ProductFormType>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      price: 0,
      discountPrice: 0,
      isPopular: false,
      description: "",
      categoryId: category.id,
      imageId: "",
    },
    mode: "onSubmit",
  })

  const isSubmitting = form.formState.isSubmitting

  return (
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
                  placeholder="Введите название продукта"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({field}) => (
            <FormItem>
              <FormLabel>Цена</FormLabel>
              <FormControl>
                <Input
                  placeholder="0"
                  type="number"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="discountPrice"
          render={({field}) => (
            <FormItem>
              <FormLabel>Цена со скидкой</FormLabel>
              <FormControl>
                <Input
                  placeholder="0"
                  type="number"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isPopular"
          render={({field}) => (
            <FormItem>
              <FormLabel>Популярный товар</FormLabel>
              <FormControl>
                <Switch
                  checked={!!field.value}
                  onCheckedChange={field.onChange}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({field}) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Коротко опишите продукт"
                  rows={6}
                  maxLength={600}
                  className="resize-y"
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
            {isSubmitting ? "Создаём…" : "Создать"}
          </Button>
        </CardFooter>
      </form>
    </Form>
  )
}