import {createSlice} from "@reduxjs/toolkit";
import type {PlacesState} from "@shared/types";
import {fetchUserPlaces} from "@entities/place";

const initialState: PlacesState = {
  placesList: [],
  loadingPlaces: false,
}

const placeSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    clearPlaces: (state) => {
      state.placesList = []
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

export const {clearPlaces} = placeSlice.actions
export default placeSlice.reducer