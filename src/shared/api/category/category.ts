import {apiBaseInstance} from "@shared/api";
import type {
  CreateCategoryResponse,
  DeleteCategoryResponse,
  FetchCategoriesResponse,
  UpdateCategoryResponse
} from "@shared/types";

export const fetchPlaceCategories = (placeId : string) : Promise<FetchCategoriesResponse> => {
  return apiBaseInstance.get<FetchCategoriesResponse>(`/${placeId}/categories`)
}

export const createPlaceCategory = (placeId : string, name: string) : Promise<CreateCategoryResponse> => {
  const formData = new FormData()
  formData.append('name', name)
  return apiBaseInstance.post<CreateCategoryResponse>(`/${placeId}/categories/new`, formData)
}

export const editCategory = (placeId : string, categoryId: string, name: string) : Promise<UpdateCategoryResponse> => {
  const formData = new FormData()
  formData.append('name', name)
  return apiBaseInstance.put<UpdateCategoryResponse>(`/${placeId}/categories/${categoryId}`, formData)
}

export const deleteCategory = (placeId : string, categoryId: string,) : Promise<DeleteCategoryResponse> => {
  return apiBaseInstance.delete<DeleteCategoryResponse>(`/${placeId}/categories/${categoryId}`)
}

