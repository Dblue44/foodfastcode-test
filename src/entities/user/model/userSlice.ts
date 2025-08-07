import {createSlice, isPending, isRejected, type PayloadAction} from "@reduxjs/toolkit";
import type {IUserState} from "@shared/types";
import {sendCode, checkCode, getUser} from "@entities/user";

const initialState: IUserState = {
  id: null,
  name: null,
  phone: null,
  username: null,
  telegramId: null,
  createdAt: null,
  updatedAt: null,
  avatarUrl: null,
  accessToken: null,
  authClosed: false,
  error: null,
  currentPage: "Главная"
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.id = null
      state.name = null
      state.phone = null
      state.username = null
      state.telegramId = null
      state.createdAt = null
      state.updatedAt = null
      state.avatarUrl = null
      state.accessToken = null
      state.authClosed = false
      state.error = null
    },
    setPageName: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkCode.fulfilled, (state, action) => {
        state.accessToken = action.payload?.data.access_token
      })
      .addCase(getUser.fulfilled, (state, action) => {
        const data = action.payload.data
        state.id = data.id
        state.name = data.name
        state.phone = data.phone
        state.username = data.username
        state.telegramId = data.telegramId
        state.createdAt = data.createdAt
        state.updatedAt = data.updatedAt
        state.avatarUrl = data.avatarUrl
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
        state.id = null
        state.name = null
        state.phone = null
        state.username = null
        state.telegramId = null
        state.createdAt = null
        state.updatedAt = null
        state.avatarUrl = null
        state.accessToken = null
        state.authClosed = false
        state.error = action.payload?.error
      }
    )
  }
})

export const {logout, setPageName} = userSlice.actions
export default userSlice.reducer