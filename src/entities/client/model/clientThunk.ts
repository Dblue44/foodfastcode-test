import {createAsyncThunk} from "@reduxjs/toolkit";
import type {ErrorLineType, FetchPlaceClientsResponse, RejectedSsoType} from "@shared/types";
import {fetchPlaceClients} from "@shared/api/client";
import {selectClientPlace} from "@entities/client";

export const fetchUserPlaceClients = createAsyncThunk<
  FetchPlaceClientsResponse,
  void,
  { state: RootState, readonly rejectValue: RejectedSsoType }
>("client/fetchPlaceClients", async (_,thunkAPI) => {
  try {
    const place = selectClientPlace(thunkAPI.getState())
    if (!place) return thunkAPI.rejectWithValue({
      error: "Empty place in clients thunk",
      isAuthError: false
    })
    return await fetchPlaceClients(place.id)
  } catch (err) {
    const knownError = err as ErrorLineType
    return thunkAPI.rejectWithValue({
      error: knownError.error || knownError.message,
      isAuthError: knownError.isAuthError
    })
  }
})