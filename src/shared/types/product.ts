import { z } from "zod"
import {apiDataSchema} from "./common";

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  discountPrice: z.number(),
  isPopular: z.boolean(),
  description: z.string(),
  image: z.string(),
  imageId: z.string(),
  categoryId: z.string(),
})
export type Product = z.infer<typeof productSchema>

export const productStoreSchema = z.object({
  productsList: z.array(productSchema).default([]),
  selectedPlaceId: z.string(),
  selectedCategoryId: z.string(),
  categoryChanged: z.boolean().default(false),
  loadingProducts: z.boolean().default(false),
})
export type ProductStore = z.infer<typeof productStoreSchema>

export const fetchCategoryProductsResponseSchema = apiDataSchema(z.array(productSchema))
export type FetchCategoryProductsResponse = z.infer<typeof fetchCategoryProductsResponseSchema>

export const fetchProductResponseSchema = apiDataSchema(productSchema)
export type FetchProductResponse = z.infer<typeof fetchProductResponseSchema>

export const createProductResponseSchema = apiDataSchema(productSchema)
export type CreateProductResponse = z.infer<typeof createProductResponseSchema>

export const updateProductResponseSchema = apiDataSchema(z.boolean())
export type UpdateProductResponse = z.infer<typeof updateProductResponseSchema>

export const deleteProductResponseSchema = apiDataSchema(z.boolean())
export type DeleteProductResponse = z.infer<typeof deleteProductResponseSchema>

export const updateProductImageResponseSchema = z.object({
  image: z.string(),
  imageId: z.string(),
  success: z.boolean(),
})

export type UpdateProductImageResponse = z.infer<typeof updateProductImageResponseSchema>