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
import {useEffect} from "react";

const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

function calcPercentFromPrices(price?: number, discountPrice?: number): number {
  if (!price || price <= 0) return 0;
  if (!discountPrice || discountPrice <= 0 || discountPrice >= price) return 0;
  const p = (1 - discountPrice / price) * 100;
  return Math.min(100, Math.max(0, round2(p)));
}

function calcDiscountPrice(price: number, percent: number): number {
  if (!price || price <= 0) return 0;
  const p = Math.min(100, Math.max(0, percent || 0));
  const dp = price * (1 - p / 100);
  return Math.min(price, Math.max(0, round2(dp)));
}

export function ProductForm({onSubmit, category, product, mode}: CreateProductFormProps) {

  const form = useForm<ProductFormType>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      price: 0,
      discountPrice: 0,
      discountPercent: 0,
      isPopular: false,
      description: "",
      categoryId: category.id,
      imageId: "",
    },
    mode: "onSubmit",
  })

  const { watch, setValue } = form;

  const price = watch("price");
  const discountPercent = watch("discountPercent");

  useEffect(() => {
    if (!product) return;
    const initialPercent = calcPercentFromPrices(product.price, product.discountPrice);
    form.reset({
      ...product,
      discountPercent: initialPercent,
      categoryId: category.id,
    });
  }, [product, category.id, form]);

  useEffect(() => {
    const newDiscountPrice = calcDiscountPrice(Number(price) || 0, Number(discountPercent) || 0);
    setValue("discountPrice", newDiscountPrice, { shouldValidate: true, shouldDirty: true });
  }, [price, discountPercent, setValue]);

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
                  placeholder=""
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step="0.01"
                  autoComplete="off"
                  value={Number(field.value)}
                  onChange={(e) => {
                    const raw = e.target.value;
                    if (raw === "") {
                      field.onChange("");
                      return;
                    }
                    const num = Number(raw);
                    field.onChange(num);
                  }}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="discountPercent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>% скидки</FormLabel>
              <FormControl>
                <Input
                  placeholder="0"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  max={100}
                  step="0.01"
                  autoComplete="off"
                  value={Number(field.value)}
                  onChange={(e) => {
                    const raw = e.target.value;
                    if (raw === "") {
                      field.onChange("");
                      return;
                    }
                    const num = Number(raw);
                    field.onChange(num);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="discountPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Цена со скидкой</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  readOnly
                  tabIndex={-1}
                  value={field.value?.toFixed ? field.value.toFixed(2) : field.value}
                  className="bg-muted/50 cursor-default"
                />
              </FormControl>
              <FormMessage />
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
            {isSubmitting ? "Сохраняем…" : (mode === "edit" ? "Сохранить" : "Создать")}
          </Button>
        </CardFooter>
      </form>
    </Form>
  )
}