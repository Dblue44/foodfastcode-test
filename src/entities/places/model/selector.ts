import {createSelector} from "@reduxjs/toolkit";
import type {IPlacesState} from "@shared/types";


export const selectPlacesBase = createSelector(
  (state: RootState) => state,
  (state) => state.places
)

export const selectPlacesList = createSelector(
  selectPlacesBase,
  (state: IPlacesState) => state.placesList ?? []
)