import {z} from "zod";

export const createPlaceSchema = z.object({
  name: z.string().min(1, "Введите название"),
  address: z.string().min(1, "Введите адрес"),
  token: z.string()
    .min(1, "Введите токен бота")
    .transform((val) => val.trim())
})

export type CreatePlaceForm = z.infer<typeof createPlaceSchema>

export const basePlaceSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  status: z.string().default("Работает"),
})

export type IBasePlace = z.infer<typeof basePlaceSchema>

export const placeSchema = basePlaceSchema.extend({
  token: z.string(),
})

export type IPlace = z.infer<typeof placeSchema>

export const placesStateSchema = z.object({
  placesList: z.array(placeSchema).default([]),
  loadingPlaces: z.boolean().default(false),
  isAuthError: z.boolean().default(false).optional(),
})

export type IPlacesState = z.infer<typeof placesStateSchema>

export const placesResponseSchema = z.object({
  data: z.array(placeSchema)
})

export type PlacesResponse = z.infer<typeof placesResponseSchema>