import {createSlice} from "@reduxjs/toolkit";
import type {PlacesState} from "@shared/types";
import {fetchUserPlaces} from "@entities/place/model/placeThunk";

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
    setCurrentPlace: (state, action) => {
      state.selectedPlace = action.payload
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

export const {clearPlaces, setCurrentPlace} = placeSlice.actions
export default placeSlice.reducer