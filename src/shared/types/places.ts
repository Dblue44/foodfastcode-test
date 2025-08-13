import {z} from "zod";
import {apiDataSchema} from "@shared/types";

export const basePlaceSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  status: z.string().default("Работает").optional(),
})

export type BasePlace = z.infer<typeof basePlaceSchema>

export const storePlaceSchema = basePlaceSchema.extend({
  token: z.string(),
})

export type Place = z.infer<typeof storePlaceSchema>

export const placesStateSchema = z.object({
  placesList: z.array(storePlaceSchema).default([]),
  loadingPlaces: z.boolean().default(false),
})

export type PlacesState = z.infer<typeof placesStateSchema>

export const fetchPlacesResponseSchema = apiDataSchema(z.array(storePlaceSchema))
export type FetchPlacesResponse = z.infer<typeof fetchPlacesResponseSchema>

export const createPlaceResponseSchema = apiDataSchema(storePlaceSchema)
export type CreatePlaceResponse = z.infer<typeof createPlaceResponseSchema>

export const updatePlaceResponseSchema = apiDataSchema(storePlaceSchema)
export type UpdatePlaceResponse = z.infer<typeof updatePlaceResponseSchema>

export const deletePlaceResponseSchema = apiDataSchema(z.boolean())
export type DeletePlaceResponse = z.infer<typeof deletePlaceResponseSchema>

export const createPlaceFormSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  token: z.string().min(40),
})

export type CreatePlaceForm = z.infer<typeof createPlaceFormSchema>
