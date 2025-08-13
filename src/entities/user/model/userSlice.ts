import {createSlice, isPending, isRejected, type PayloadAction} from "@reduxjs/toolkit";
import type {Crumb, UserStore} from "@shared/types";
import {sendCode, checkCode, getUser} from "@entities/user";

const initialState: UserStore = {
  user: null,
  accessToken: null,
  authClosed: false,
  error: null,
  crumbs: [{label:"Главная", to:null}],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.accessToken = null
      state.authClosed = false
      state.error = null
    },
    setCrumbs: (state, action: PayloadAction<Crumb[]>) => {
      state.crumbs = action.payload;
    },
    clearCrumbs: (state) => {
      state.crumbs = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkCode.fulfilled, (state, action) => {
        state.accessToken = action.payload?.data.access_token
      })
      .addCase(getUser.fulfilled, (state, action) => {
        const data = action.payload.data
        state.user = { ...data}
        state.authClosed = true
      })
    builder.addMatcher(
      isPending(sendCode, checkCode),
      state => {
        state.authClosed = false
      }
    )
    builder.addMatcher(
      isRejected(sendCode, checkCode),
      (state, action) => {
        state.user = null
        state.accessToken = null
        state.authClosed = false
        state.error = action.payload?.error
      }
    )
  }
})

export const {logout, setCrumbs, clearCrumbs} = userSlice.actions
export default userSlice.reducer