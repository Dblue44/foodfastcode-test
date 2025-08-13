import {apiBaseInstance} from "@shared/api";
import type {
  ProductFormType,
  CreateProductResponse, DeleteProductResponse,
  FetchCategoryProductsResponse,
  FetchProductResponse,
  UpdateProductResponse
} from "@shared/types";
import type {UpdateProductImageResponse} from "@shared/types/product.ts";

const setProductForm = (data: ProductFormType) => {
  const formData = new FormData()
  formData.append('name', data.name)
  formData.append('description', data.description)
  formData.append('categoryId', data.categoryId)
  formData.append('price', data.price.toString())
  formData.append('discountPrice', data.discountPrice.toString())
  formData.append('isPopular', data.isPopular.toString())
  formData.append('image', data.imageId)
  return formData
}

export const fetchCategoryProducts = (placeId: string, categoryId: string): Promise<FetchCategoryProductsResponse> => {
  return apiBaseInstance.get<FetchCategoryProductsResponse>(`/${placeId}/categories/${categoryId}/products`)
}

export const fetchProduct = (placeId: string, productId: string): Promise<FetchProductResponse> => {
  return apiBaseInstance.get<FetchProductResponse>(`/${placeId}/products/${productId}`)
}

export const createCategoryProduct = (placeId: string, categoryId: string, data: ProductFormType): Promise<CreateProductResponse> => {
  const formData = setProductForm(data)
  return apiBaseInstance.post<CreateProductResponse>(`/${placeId}/categories/${categoryId}/products`, formData)
}

export const editProduct = (placeId: string, productId: string, data: ProductFormType): Promise<UpdateProductResponse> => {
  const formData = setProductForm(data)
  return apiBaseInstance.put<UpdateProductResponse>(`/${placeId}/products/${productId}`, formData)
}

export const deleteProduct = (placeId: string, productId: string): Promise<DeleteProductResponse> => {
  return apiBaseInstance.delete<DeleteProductResponse>(`/${placeId}/products/${productId}`)
}

export const loadProductImage = (placeId: string, productId: string, image: File): Promise<UpdateProductImageResponse> => {
  const formData = new FormData()
  formData.append('image', image)
  return apiBaseInstance.post<UpdateProductImageResponse>(`/${placeId}/products/${productId}/image`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
}