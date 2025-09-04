import { z } from "zod"
import {apiDataSchema} from "./common";

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  placeId: z.string(),
})
export type Category = z.infer<typeof categorySchema>

export const categoryStoreSchema = z.object({
  categoriesList: z.array(categorySchema).default([]),
  selectedPlaceId: z.string(),
  loadingCategories: z.boolean().default(false),
})

export type CategoryStore = z.infer<typeof categoryStoreSchema>

export const fetchCategoriesResponseSchema = apiDataSchema(z.array(categorySchema))
export type FetchCategoriesResponse = z.infer<typeof fetchCategoriesResponseSchema>

export const createCategoryResponseSchema = apiDataSchema(categorySchema)
export type CreateCategoryResponse = z.infer<typeof createCategoryResponseSchema>

export const updateCategoryResponseSchema = apiDataSchema(z.boolean())
export type UpdateCategoryResponse = z.infer<typeof updateCategoryResponseSchema>

export const deleteCategoryResponseSchema = apiDataSchema(z.boolean())
export type DeleteCategoryResponse = z.infer<typeof deleteCategoryResponseSchema>