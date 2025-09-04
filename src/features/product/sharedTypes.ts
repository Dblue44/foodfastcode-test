import z from "zod"

export const productFormSchema = z.object({
  name: z.string().min(1, "Введите название"),
  price: z.coerce.number().gt(0, "Введите цену"),
  discountPrice: z.coerce.number(),
  discountPercent: z.coerce.number().gte(0).lte(100),
  isPopular: z.coerce.boolean(),
  description: z.string().min(1, "Введите описание"),
  categoryId: z.string().min(1, "Выберите категорию"),
  image: z.string().min(1, "Выберите изображение"),
  imageId: z.string(),
})

export type ProductFormType = z.infer<typeof productFormSchema>