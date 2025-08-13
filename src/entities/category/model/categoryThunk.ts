import {createAsyncThunk} from "@reduxjs/toolkit";
import type {
  CreateCategoryResponse, DeleteCategoryResponse,
  ErrorLineType,
  FetchCategoriesResponse,
  RejectedSsoType,
  UpdateCategoryResponse
} from "@shared/types";
import {fetchPlaceCategories, createPlaceCategory, editCategory, deleteCategory} from "@shared/api/category";
import {selectCategoryPlaceId} from "@entities/category";

export const fetchUserPlaceCategories = createAsyncThunk<
  FetchCategoriesResponse,
  void,
  { state: RootState, readonly rejectValue: RejectedSsoType }
>("category/fetchPlaceCategories", async (_,thunkAPI) => {
  try {
    const placeId = selectCategoryPlaceId(thunkAPI.getState())
    return await fetchPlaceCategories(placeId)
  } catch (err) {
    const knownError = err as ErrorLineType
    return thunkAPI.rejectWithValue({
      error: knownError.error || knownError.message,
      isAuthError: knownError.isAuthError
    })
  }
})

export const createUserPlaceCategory = createAsyncThunk<
  CreateCategoryResponse,
  string,
  { state: RootState, readonly rejectValue: RejectedSsoType }
>("category/createPlaceCategory", async (categoryName,thunkAPI) => {
  try {
    const placeId = selectCategoryPlaceId(thunkAPI.getState())
    return await createPlaceCategory(placeId, categoryName)
  } catch (err) {
    const knownError = err as ErrorLineType
    return thunkAPI.rejectWithValue({
      error: knownError.error || knownError.message,
      isAuthError: knownError.isAuthError
    })
  }
})

export const editUserPlaceCategory = createAsyncThunk<
  UpdateCategoryResponse,
  { id: string, name: string },
  { state: RootState, readonly rejectValue: RejectedSsoType }
>("category/editCategory", async ({ id, name },thunkAPI) => {
  try {
    const placeId = selectCategoryPlaceId(thunkAPI.getState())
    return await editCategory(placeId, id, name)
  } catch (err) {
    const knownError = err as ErrorLineType
    return thunkAPI.rejectWithValue({
      error: knownError.error || knownError.message,
      isAuthError: knownError.isAuthError
    })
  }
})

export const deleteUserPlaceCategory = createAsyncThunk<
  DeleteCategoryResponse,
  string,
  { state: RootState, readonly rejectValue: RejectedSsoType }
>("category/deleteCategory", async (categoryId,thunkAPI) => {
  try {
    const placeId = selectCategoryPlaceId(thunkAPI.getState())
    return await deleteCategory(placeId, categoryId)
  } catch (err) {
    const knownError = err as ErrorLineType
    return thunkAPI.rejectWithValue({
      error: knownError.error || knownError.message,
      isAuthError: knownError.isAuthError
    })
  }
})