import {createSelector} from "@reduxjs/toolkit";
import type {CategoryStore} from "@shared/types";

export const selectCategoryStoreBase = createSelector(
  (state: RootState) => state,
  (state) => state.category
)

export const selectPlaceCategoriesList = createSelector(
  selectCategoryStoreBase,
  (state: CategoryStore) => state.categoriesList
)

export const selectCategoryPlaceId = createSelector(
  selectCategoryStoreBase,
  (state: CategoryStore) => state.selectedPlaceId
)

export const selectIsCategoriesLoading = createSelector(
  selectCategoryStoreBase,
  (state: CategoryStore) => state.loadingCategories
)