import {z} from "zod";
import {categorySchema} from "@shared/types";

export const createProductFormPropsSchema = z.object({
  onSubmit: z.function().args(z.any()).returns(z.void()),
  category: categorySchema,
})

export type CreateProductFormProps = z.infer<typeof createProductFormPropsSchema>

export const selectCategoryMenuPropsSchema = z.object({
  form: z.any(),
  categories: z.array(categorySchema),
  selected: categorySchema.optional()
})

export type SelectCategoryMenuProps = z.infer<typeof selectCategoryMenuPropsSchema>