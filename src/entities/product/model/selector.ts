import {createSelector} from "@reduxjs/toolkit";
import type {ProductStore} from "@shared/types";

export const selectProductStoreBase = createSelector(
  (state: RootState) => state,
  (state) => state.product
)

export const selectCategoryProductsList = createSelector(
  selectProductStoreBase,
  (state: ProductStore) => state.productsList.filter((product) => product.categoryId === state.selectedCategoryId)
)

export const selectCategoryId = createSelector(
  selectProductStoreBase,
  (state: ProductStore) => state.selectedCategoryId
)

export const selectProductPlaceId = createSelector(
  selectProductStoreBase,
  (state: ProductStore) => state.selectedPlaceId
)

export const selectIsProductsLoading = createSelector(
  selectProductStoreBase,
  (state: ProductStore) => state.loadingProducts
)

export const selectCategoryChanged = createSelector(
  selectProductStoreBase,
  (state: ProductStore) => state.categoryChanged
)