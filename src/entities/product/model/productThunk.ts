import {createAsyncThunk} from "@reduxjs/toolkit";
import type {
  ProductFormType,
  CreateProductResponse, DeleteProductResponse,
  ErrorLineType,
  FetchCategoryProductsResponse,
  FetchProductResponse,
  RejectedSsoType, UpdateProductResponse
} from "@shared/types";
import {
  createCategoryProduct,
  deleteProduct,
  editProduct,
  fetchCategoryProducts,
  fetchProduct, loadProductImage
} from "@shared/api/product";
import {selectCategoryId, selectProductPlaceId} from "@entities/product";
import type {UpdateProductImageResponse} from "@shared/types/product.ts";

export const fetchUserCategoryProducts = createAsyncThunk<
  FetchCategoryProductsResponse,
  void,
  { state: RootState, readonly rejectValue: RejectedSsoType }
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
  { state: RootState, readonly rejectValue: RejectedSsoType }
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
  { state: RootState, readonly rejectValue: RejectedSsoType }
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
  { state: RootState, readonly rejectValue: RejectedSsoType }
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
  { state: RootState, readonly rejectValue: RejectedSsoType }
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
  { state: RootState, readonly rejectValue: RejectedSsoType }
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