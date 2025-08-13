import {createAsyncThunk} from "@reduxjs/toolkit";
import type {
  CreatePlaceForm,
  CreatePlaceResponse, DeletePlaceResponse,
  ErrorLineType,
  FetchPlacesResponse,
  Place,
  RejectedSsoType,
  UpdatePlaceResponse
} from "@shared/types";
import {createPlace, fetchPlaces, deletePlace, editPlace} from "@shared/api/place";


export const fetchUserPlaces = createAsyncThunk<
  FetchPlacesResponse,
  void,
  { readonly rejectValue: RejectedSsoType }
>("places/fetchPlaces", async (_,thunkAPI) => {
  try {
    return await fetchPlaces()
  } catch (err) {
    const knownError = err as ErrorLineType
    return thunkAPI.rejectWithValue({
      error: knownError.error || knownError.message,
      isAuthError: knownError.isAuthError
    })
  }
})

export const createUserPlace = createAsyncThunk<
  CreatePlaceResponse,
  CreatePlaceForm,
  { readonly rejectValue: RejectedSsoType }
>("places/createPlace", async (data,thunkAPI) => {
  try {
    return await createPlace(data);
  } catch (err) {
    const knownError = err as ErrorLineType
    return thunkAPI.rejectWithValue({
      error: knownError.error || knownError.message,
      isAuthError: knownError.isAuthError
    })
  }
})

export const updateUserPlace = createAsyncThunk<
  UpdatePlaceResponse,
  Place,
  { readonly rejectValue: RejectedSsoType }
>("places/editPlace", async (form,thunkAPI) => {
  try {
    return await editPlace(form);
  } catch (err) {
    const knownError = err as ErrorLineType
    return thunkAPI.rejectWithValue({
      error: knownError.error || knownError.message,
      isAuthError: knownError.isAuthError
    })
  }
})

export const deleteUserPlace = createAsyncThunk<
  DeletePlaceResponse,
  string,
  { readonly rejectValue: RejectedSsoType }
>("places/deletePlace", async (placeId,thunkAPI) => {
  try {
    return await deletePlace(placeId);
  } catch (err) {
    const knownError = err as ErrorLineType
    return thunkAPI.rejectWithValue({
      error: knownError.error || knownError.message,
      isAuthError: knownError.isAuthError
    })
  }
})