import type {CreatePlaceForm, PlacesResponse} from "@shared/types";
import {apiBaseInstance} from "@shared/api";

export const getPlaces = () : Promise<PlacesResponse> => {
  return apiBaseInstance.get<PlacesResponse>("")
}

export const createPlace = (data: CreatePlaceForm) : Promise<PlacesResponse> => {
  const formData = new FormData()
  formData.append('name', data.name)
  formData.append('address', data.address)
  formData.append('token', data.token)
  return apiBaseInstance.post<PlacesResponse>("/new", formData)
}