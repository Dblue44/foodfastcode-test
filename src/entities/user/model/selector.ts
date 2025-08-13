import {createSelector} from "@reduxjs/toolkit";
import type {UserStore} from "@shared/types";

export const selectUserBase = createSelector(
  (state: RootState) => state,
  (state) => state.user
)

export const selectCrumbs = createSelector(
  selectUserBase,
  (state: UserStore) => state.crumbs
)

export const selectAccessToken = createSelector(
  selectUserBase,
  (state: UserStore) => state.accessToken
)