import {createAsyncThunk} from "@reduxjs/toolkit";
import type {
  CreateProductResponse, DeleteProductResponse,
  ErrorLineType,
  FetchCategoryProductsResponse,
  FetchProductResponse,
  RejectedSsoType, UpdateProductResponse, LoadImageResponse
} from "@shared/types";
import {
  createCategoryProduct,
  deleteProduct,
  editProduct,
  fetchCategoryProducts,
  fetchProduct,
  loadProductImage,
  loadImageApi
} from "@shared/api/product";
import {selectCategoryId, selectProductPlaceId} from "./selector";
import type {UpdateProductImageResponse} from "@shared/types/product.ts";
import type {ProductFormType} from "@features/product/sharedTypes.ts";

export const fetchUserCategoryProducts = createAsyncThunk<
  FetchCategoryProductsResponse,
  void,
  { readonly rejectValue: RejectedSsoType}
>("product/fetchCategoryProducts", async (_, thunkAPI) => {
  try {
    const categoryId = selectCategoryId(thunkAPI.getState())
    const placeId = selectProductPlaceId(thunkAPI.getState())
    return await fetchCategoryProducts(placeId, categoryId)
  } catch (err) {
    const knownError = err as ErrorLineType
    return thunkAPI.rejectWithValue({
      error: knownError.error || knownError.message,
      isAuthError: knownError.isAuthError
    })
  }
})

export const fetchUserProduct = createAsyncThunk<
  FetchProductResponse,
  string,
  { readonly rejectValue: RejectedSsoType }
>("product/fetchProduct", async (productId, thunkAPI) => {
  try {
    const placeId = selectProductPlaceId(thunkAPI.getState())
    return await fetchProduct(placeId, productId)
  } catch (err) {
    const knownError = err as ErrorLineType
    return thunkAPI.rejectWithValue({
      error: knownError.error || knownError.message,
      isAuthError: knownError.isAuthError
    })
  }
})

export const createUserCategoryProduct = createAsyncThunk<
  CreateProductResponse,
  ProductFormType,
  { readonly rejectValue: RejectedSsoType }
>("product/createCategoryProduct", async (product, thunkAPI) => {
  try {
    const categoryId = selectCategoryId(thunkAPI.getState())
    const placeId = selectProductPlaceId(thunkAPI.getState())
    return await createCategoryProduct(placeId, categoryId, product)
  } catch (err) {
    const knownError = err as ErrorLineType
    return thunkAPI.rejectWithValue({
      error: knownError.error || knownError.message,
      isAuthError: knownError.isAuthError
    })
  }
})

export const editUserProduct = createAsyncThunk<
  UpdateProductResponse,
  { productId: string, product: ProductFormType },
  { readonly rejectValue: RejectedSsoType }
>("product/editProduct", async ({productId, product}, thunkAPI) => {
  try {
    const placeId = selectProductPlaceId(thunkAPI.getState())
    return await editProduct(placeId, productId, product)
  } catch (err) {
    const knownError = err as ErrorLineType
    return thunkAPI.rejectWithValue({
      error: knownError.error || knownError.message,
      isAuthError: knownError.isAuthError
    })
  }
})

export const deleteUserProduct = createAsyncThunk<
  DeleteProductResponse,
  string,
  { readonly rejectValue: RejectedSsoType }
>("product/deleteProduct", async (productId, thunkAPI) => {
  try {
    const placeId = selectProductPlaceId(thunkAPI.getState())
    return await deleteProduct(placeId, productId)
  } catch (err) {
    const knownError = err as ErrorLineType
    return thunkAPI.rejectWithValue({
      error: knownError.error || knownError.message,
      isAuthError: knownError.isAuthError
    })
  }
})

export const loadUserProductImage = createAsyncThunk<
  UpdateProductImageResponse,
  { productId: string, image: File },
  { readonly rejectValue: RejectedSsoType }
>("product/loadProductImage", async ({productId, image}, thunkAPI) => {
  try {
    const placeId = selectProductPlaceId(thunkAPI.getState())
    return await loadProductImage(placeId, productId, image)
  } catch (err) {
    const knownError = err as ErrorLineType
    return thunkAPI.rejectWithValue({
      error: knownError.error || knownError.message,
      isAuthError: knownError.isAuthError
    })
  }
})

export const loadImage = createAsyncThunk<
  LoadImageResponse,
  File,
  { readonly rejectValue: RejectedSsoType }
>("common/loadImage", async (image, thunkAPI) => {
  try {
    return await loadImageApi(image)
  } catch (err) {
    const knownError = err as ErrorLineType
    return thunkAPI.rejectWithValue({
      error: knownError.error || knownError.message,
      isAuthError: knownError.isAuthError
    })
  }
})