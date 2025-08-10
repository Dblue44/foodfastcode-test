import {createAsyncThunk} from "@reduxjs/toolkit";
import type {ErrorLineType, PlacesResponse, RejectedSsoType, IPlace} from "@shared/types";
import {createPlace, getPlaces, removePlace, editPlace} from "@shared/api/places";


export const getUserPlaces = createAsyncThunk<
  PlacesResponse,
  void,
  { readonly rejectValue: RejectedSsoType }
>("places/getPlaces", async (_,thunkAPI) => {
  try {
    return await getPlaces()
  } catch (err) {
    const knownError = err as ErrorLineType
    return thunkAPI.rejectWithValue({
      error: knownError.error || knownError.message,
      isAuthError: knownError.isAuthError
    })
  }
})

export const updateUserPlace = createAsyncThunk<
  PlacesResponse,
  IPlace,
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

export const removeUserPlace = createAsyncThunk<
  PlacesResponse,
  string,
  { readonly rejectValue: RejectedSsoType }
>("places/removePlace", async (placeId,thunkAPI) => {
  try {
    return await removePlace(placeId);
  } catch (err) {
    const knownError = err as ErrorLineType
    return thunkAPI.rejectWithValue({
      error: knownError.error || knownError.message,
      isAuthError: knownError.isAuthError
    })
  }
})

export const createUserPlace = createAsyncThunk<
  PlacesResponse,
  IPlace,
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