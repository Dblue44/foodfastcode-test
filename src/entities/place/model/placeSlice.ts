import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {Place, PlacesState} from "@shared/types";
import {fetchUserPlaces} from "./placeThunk";

const initialState: PlacesState = {
  placesList: [],
  selectedPlace: undefined,
  loadingPlaces: false,
}

const placeSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    clearPlaces: (state) => {
      state.placesList = []
    },
    setCurrentPlace: (state, action: PayloadAction<Place | undefined>) => {
      state.selectedPlace = action.payload
    },
    removePlaceFromList: (state, action: PayloadAction<string>) => {
      state.placesList = state.placesList.filter((place) => place.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPlaces.pending, (state) => {
        state.loadingPlaces = true
      })
      .addCase(fetchUserPlaces.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.placesList = [...action.payload.data]
        }
        state.loadingPlaces = false
      })
      .addCase(fetchUserPlaces.rejected, (state) => {
        state.loadingPlaces = false
      })
  }
})

export const {clearPlaces, setCurrentPlace, removePlaceFromList} = placeSlice.actions
export default placeSlice.reducer