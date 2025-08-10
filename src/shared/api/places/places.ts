import type {IPlace, PlacesResponse} from "@shared/types";
import {apiBaseInstance} from "@shared/api";

export const getPlaces = () : Promise<PlacesResponse> => {
  return apiBaseInstance.get<PlacesResponse>("")
}

export const createPlace = (data: IPlace) : Promise<PlacesResponse> => {
  const formData = new FormData()
  formData.append('name', data.name)
  formData.append('address', data.address)
  formData.append('token', data.token)
  return apiBaseInstance.post<PlacesResponse>("new", formData)
}

export const removePlace = (placeId: string) : Promise<PlacesResponse> => {
  return apiBaseInstance.delete<PlacesResponse>(`?placeId=${placeId}`)
}

export const editPlace = (data: IPlace) : Promise<PlacesResponse> => {
  const formData = new FormData()
  formData.append('id', data.id)
  formData.append('name', data.name)
  formData.append('address', data.address)
  formData.append('token', data.token)
  return apiBaseInstance.put<PlacesResponse>(`${data.id}`, formData)
}