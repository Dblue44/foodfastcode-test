import {createSelector} from "@reduxjs/toolkit";
import type {IUserState} from "@shared/types";

export const selectUserBase = createSelector(
  (state: RootState) => state,
  (state) => state.user
)

export const selectAccessToken = createSelector(
  selectUserBase,
  (state: IUserState) => state.accessToken
)