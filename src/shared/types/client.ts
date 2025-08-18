import { z } from "zod"
import {apiDataSchema} from "@shared/types/common.ts";
import {basePlaceSchema} from "@shared/types/places.ts";

export const clientSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  telegramId: z.string(),
  phone: z.string(),
  avatarUrl: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
export type Client = z.infer<typeof clientSchema>

export const clientStoreSchema = z.object({
  clientsList: z.array(clientSchema).default([]),
  selectedClient: clientSchema.optional(),
  selectedPlace: basePlaceSchema.optional(),
  loadingClients: z.boolean().default(false),
})

export type ClientStore = z.infer<typeof clientStoreSchema>

export const fetchPlaceClientsResponseSchema = apiDataSchema(z.array(clientSchema))
export type FetchPlaceClientsResponse = z.infer<typeof fetchPlaceClientsResponseSchema>