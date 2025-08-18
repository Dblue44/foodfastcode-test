import type {FetchPlaceClientsResponse} from "@shared/types";
import {apiBaseInstance} from "@shared/api";

export const fetchPlaceClients = (placeId: string) : Promise<FetchPlaceClientsResponse> => {
  return apiBaseInstance.get<FetchPlaceClientsResponse>(`/${placeId}/users`)
}