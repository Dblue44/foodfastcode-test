import type {PlacesResponse} from "@shared/types";
import {apiBaseInstance} from "@shared/api";

export const getPlaces = () : Promise<PlacesResponse> => {
  return apiBaseInstance.get<PlacesResponse>("")
}