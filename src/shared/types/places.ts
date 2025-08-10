import {z} from "zod";

export const placeSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  status: z.string().default("Работает").optional(),
})

export type IBasePlace = z.infer<typeof placeSchema>

export const storePlaceSchema = placeSchema.extend({
  token: z.string(),
})

export type IPlace = z.infer<typeof storePlaceSchema>

export const placesStateSchema = z.object({
  placesList: z.array(storePlaceSchema).default([]),
  loadingPlaces: z.boolean().default(false),
  isAuthError: z.boolean().default(false).optional(),
})

export type IPlacesState = z.infer<typeof placesStateSchema>

export const placesResponseSchema = z.object({
  data: z.array(storePlaceSchema)
})

export type PlacesResponse = z.infer<typeof placesResponseSchema>