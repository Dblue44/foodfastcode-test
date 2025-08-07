import {createAsyncThunk} from "@reduxjs/toolkit";
import type {ErrorLineType, PlacesResponse, RejectedSsoType} from "@shared/types";
import {getPlaces} from "@shared/api/places";


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