import {z} from "zod";
import {categorySchema, productSchema} from "@shared/types";

export const productListPropsSchema = z.object({
  data: z.array(productSchema),
  category: categorySchema,
  isProductsLoading: z.boolean().default(true),
});

export type ProductListProps = z.infer<typeof productListPropsSchema>;

export const productActionsCellPropsSchema = z.object({
  product: productSchema,
  onEdit: z.function().args(productSchema).returns(z.void()),
})

export type ProductActionsCellProps = z.infer<typeof productActionsCellPropsSchema>

export const productTableMetaSchema = z.object({
  onEdit: z.function().args(productSchema).returns(z.void()),
})

export type ProductTableMeta = z.infer<typeof productTableMetaSchema>