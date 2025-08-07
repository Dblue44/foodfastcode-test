import {z} from "zod";

export const basePlaceSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  status: z.string().default("Работает")
})

export type IBasePlace = z.infer<typeof basePlaceSchema>

export const placeSchema = basePlaceSchema.extend({
  token: z.string(),
})

export type IPlace = z.infer<typeof placeSchema>

export const placesStateSchema = z.object({
  placesList: z.array(placeSchema).default([]),
  loadingPlaces: z.boolean().default(false),
})

export type IPlacesState = z.infer<typeof placesStateSchema>

export const placesResponseSchema = z.object({
  data: z.array(placeSchema)
})

export type PlacesResponse = z.infer<typeof placesResponseSchema>