import {z} from "zod";
import {categorySchema, productSchema} from "@shared/types";
import {dialogModeSchema} from "@shared/types/common.ts";

export const createProductFormPropsSchema = z.object({
  onSubmit: z.function().args(z.any()).returns(z.void()),
  category: categorySchema,
  product: productSchema.optional(),
  mode: dialogModeSchema.shape.mode,
})

export type CreateProductFormProps = z.infer<typeof createProductFormPropsSchema>

export const selectCategoryMenuPropsSchema = z.object({
  form: z.any(),
  categories: z.array(categorySchema),
  selected: categorySchema.optional()
})

export type SelectCategoryMenuProps = z.infer<typeof selectCategoryMenuPropsSchema>