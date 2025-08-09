import {createAsyncThunk} from "@reduxjs/toolkit";
import type {ErrorLineType, PlacesResponse, RejectedSsoType, CreatePlaceForm} from "@shared/types";
import {createPlace, getPlaces} from "@shared/api/places";


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

export const createUserPlace = createAsyncThunk<
  PlacesResponse,
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