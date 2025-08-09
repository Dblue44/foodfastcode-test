import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {IPlacesState} from "@shared/types";
import {getUserPlaces} from "@entities/places";

const initialState: IPlacesState = {
  placesList: [],
  loadingPlaces: false,
  isAuthError: false
}

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    setPlaceCategories: (state, action: PayloadAction<{placeId: string}>) => {
      state.placesList?.filter(place => place.id === action.payload.placeId)
    },
    resetAuthError: (state) => {
      state.isAuthError = false
    },
    clearPlaces: (state) => {
      state.placesList = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserPlaces.pending, (state) => {
        state.loadingPlaces = true
      })
      .addCase(getUserPlaces.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.placesList = action.payload.data
        }
        state.loadingPlaces = false
      })
      .addCase(getUserPlaces.rejected, (state, action) => {
        state.isAuthError = action.payload?.isAuthError
        state.loadingPlaces = false
      })
  }
})

export const {setPlaceCategories, resetAuthError, clearPlaces} = placesSlice.actions
export default placesSlice.reducer