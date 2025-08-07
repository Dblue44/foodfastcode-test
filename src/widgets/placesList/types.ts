import {z} from "zod";
import {basePlaceSchema} from "@shared/types";


export const placesListProps = z.object({
  data: z.array(basePlaceSchema),
});

export type PlacesListProps = z.infer<typeof placesListProps>;