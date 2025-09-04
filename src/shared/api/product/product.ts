import {apiBaseInstance} from "@shared/api";
import type {
  CreateProductResponse, DeleteProductResponse,
  FetchCategoryProductsResponse,
  FetchProductResponse,
  UpdateProductResponse,
  LoadImageResponse
} from "@shared/types";
import type {UpdateProductImageResponse} from "@shared/types/product.ts";
import type {ProductFormType} from "@features/product/sharedTypes.ts";

export const fetchCategoryProducts = (placeId: string, categoryId: string): Promise<FetchCategoryProductsResponse> => {
  return apiBaseInstance.get<FetchCategoryProductsResponse>(`/${placeId}/categories/${categoryId}/products`)
}

export const fetchProduct = (placeId: string, productId: string): Promise<FetchProductResponse> => {
  return apiBaseInstance.get<FetchProductResponse>(`/${placeId}/products/${productId}`)
}

export const createCategoryProduct = (placeId: string, categoryId: string, data: ProductFormType): Promise<CreateProductResponse> => {
  return apiBaseInstance.postRaw<CreateProductResponse>(`/${placeId}/categories/${categoryId}/products`, JSON.stringify(data))
}

export const editProduct = (placeId: string, productId: string, data: ProductFormType): Promise<UpdateProductResponse> => {
  return apiBaseInstance.putRaw<UpdateProductResponse>(`/${placeId}/products/${productId}`, JSON.stringify(data))
}

export const deleteProduct = (placeId: string, productId: string): Promise<DeleteProductResponse> => {
  return apiBaseInstance.delete<DeleteProductResponse>(`/${placeId}/products/${productId}`)
}

export const loadProductImage = (placeId: string, productId: string, image: File): Promise<UpdateProductImageResponse> => {
  const formData = new FormData()
  formData.append('image', image)
  return apiBaseInstance.post<UpdateProductImageResponse>(`/${placeId}/products/${productId}/image`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
}

export const loadImageApi = (image: File): Promise<LoadImageResponse> => {
  const formData = new FormData()
  formData.append('image', image)
  return apiBaseInstance.post<LoadImageResponse>('/images/upload', formData, {headers: {'Content-Type': 'multipart/form-data'}})
}