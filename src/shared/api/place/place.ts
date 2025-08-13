import type {
  Place,
  CreatePlaceForm,
  CreatePlaceResponse,
  DeletePlaceResponse,
  FetchPlacesResponse,
  UpdatePlaceResponse
} from "@shared/types";
import {apiBaseInstance} from "@shared/api";

export const fetchPlaces = () : Promise<FetchPlacesResponse> => {
  return apiBaseInstance.get<FetchPlacesResponse>("")
}

export const createPlace = (data: CreatePlaceForm) : Promise<CreatePlaceResponse> => {
  const formData = new FormData()
  formData.append('name', data.name)
  formData.append('address', data.address)
  formData.append('token', data.token)
  return apiBaseInstance.post<CreatePlaceResponse>("new", formData)
}

export const editPlace = (data: Place) : Promise<UpdatePlaceResponse> => {
  const formData = new FormData()
  formData.append('name', data.name)
  formData.append('address', data.address)
  formData.append('token', data.token)
  return apiBaseInstance.put<UpdatePlaceResponse>(`?id=${data.id}`, formData)
}


export const deletePlace = (placeId: string) : Promise<DeletePlaceResponse> => {
  return apiBaseInstance.delete<DeletePlaceResponse>(`?placeId=${placeId}`)
}