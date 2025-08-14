import {createSelector} from "@reduxjs/toolkit";
import type {PlacesState} from "@shared/types";

export const selectPlacesBase = createSelector(
  (state: RootState) => state,
  (state) => state.places
)

export const selectPlacesList = createSelector(
  selectPlacesBase,
  (state: PlacesState) => state.placesList ?? []
)

export const selectCurrentPlace = createSelector(
  selectPlacesBase,
  (state: PlacesState) => state.selectedPlace
)