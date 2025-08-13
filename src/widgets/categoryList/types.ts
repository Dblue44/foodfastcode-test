import {z} from "zod";
import {categorySchema} from "@shared/types";


export const categoryListPropsSchema = z.object({
  data: z.array(categorySchema),
  isCategoriesLoading: z.boolean().default(false),
  isNarrow: z.boolean().default(false),
})

export type CategoryListProps = z.infer<typeof categoryListPropsSchema>

export const tableMetaSchema = z.object({
  onEdit: z.function().args(categorySchema).returns(z.void()),
})

export type TableMeta = z.infer<typeof tableMetaSchema>

export const categoryActionsCellPropsSchema = z.object({
  category: categorySchema,
  onEdit: z.function().args(categorySchema).returns(z.void()),
})

export type CategoryActionsCellProps = z.infer<typeof categoryActionsCellPropsSchema>