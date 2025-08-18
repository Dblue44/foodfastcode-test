import {createSelector} from "@reduxjs/toolkit";
import type {ClientStore} from "@shared/types";

export const selectClientStoreBase = createSelector(
  (state: RootState) => state,
  (state) => state.client
)

export const selectAllClients = createSelector(
  selectClientStoreBase,
  (state: ClientStore) => state.clientsList
)

export const selectClientPlace = createSelector(
  selectClientStoreBase,
  (state: ClientStore) => state.selectedPlace
)

export const selectIsClientsLoading = createSelector(
  selectClientStoreBase,
  (state: ClientStore) => state.loadingClients
)