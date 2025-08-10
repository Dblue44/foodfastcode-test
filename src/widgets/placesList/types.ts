import {z} from "zod";
import {placeSchema} from "@shared/types";


export const placesListProps = z.object({
  data: z.array(placeSchema),
});

export type PlacesListProps = z.infer<typeof placesListProps>;