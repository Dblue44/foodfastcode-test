import {z} from "zod";
import {storePlaceSchema} from "@shared/types";

export const placeSettingsPropsSchema = z.object({
  place: z.object(storePlaceSchema.shape)
})

export type PlaceSettingsProps = z.infer<typeof placeSettingsPropsSchema>