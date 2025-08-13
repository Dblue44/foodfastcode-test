import {z} from "zod";
import {categorySchema} from "@shared/types";


export const categoryListPropsSchema = z.object({
  data: z.array(categorySchema),
  isCategoriesLoading: z.boolean().default(false),
  isNarrow: z.boolean().default(false),
})

export type CategoryListProps = z.infer<typeof categoryListPropsSchema>

export const categoryTableMetaSchema = z.object({
  onEdit: z.function().args(categorySchema).returns(z.void()),
})

export type CategoryTableMeta = z.infer<typeof categoryTableMetaSchema>

export const categoryActionsCellPropsSchema = z.object({
  category: categorySchema,
  onEdit: z.function().args(categorySchema).returns(z.void()),
})

export type CategoryActionsCellProps = z.infer<typeof categoryActionsCellPropsSchema>