import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {IPlacesState} from "@shared/types";
import {getUserPlaces} from "@entities/places";

const initialState: IPlacesState = {
  placesList: [],
  loadingPlaces: false
}

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    setPlaceCategories: (state, action: PayloadAction<{placeId: string}>) => {
      state.placesList?.filter(place => place.id === action.payload.placeId)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserPlaces.pending, (state) => {
        state.loadingPlaces = true
      })
      .addCase(getUserPlaces.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.placesList = state.placesList ? [...state.placesList, ...action.payload.data] : action.payload.data
        }
        state.loadingPlaces = false
      })
      .addCase(getUserPlaces.rejected, (state) => {
        state.loadingPlaces = false
      })
  }
})

export const {setPlaceCategories} = placesSlice.actions
export default placesSlice.reducer