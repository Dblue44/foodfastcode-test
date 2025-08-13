import {z} from "zod";
import {categorySchema, productSchema} from "@shared/types";

export const productListPropsSchema = z.object({
  data: z.array(productSchema),
  category: categorySchema.optional(),
  isProductsLoading: z.boolean().default(true),
});

export type ProductListProps = z.infer<typeof productListPropsSchema>;