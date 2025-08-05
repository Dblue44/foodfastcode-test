import {createSelector} from "@reduxjs/toolkit";
import type {IUserState} from "@shared/types";

export const selectUserBase = createSelector(
  (state: RootState) => state,
  (state) => state.user
)

export const selectUserType = createSelector(
  selectUserBase,
  (state: IUserState) => state.type
)

export const selectAccessToken = createSelector(
  selectUserBase,
  (state: IUserState) => state.accessToken
)

export const selectIsLoading = createSelector(
  selectUserBase,
  (state: IUserState) => state.isLoading
)