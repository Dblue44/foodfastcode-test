import {createSlice, isPending, isRejected} from "@reduxjs/toolkit";
import type {IUserState} from "@shared/types";
import {sendCode, checkCode} from "@entities/user";

const initialState: IUserState = {
  id: null,
  name: null,
  email: null,
  error: null,
  accessToken: null,
  isLoading: false,
  type: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.id = ""
      state.name = ""
      state.email = ""
      state.isLoading = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(checkCode.fulfilled, (state, action) => {
      state.accessToken = action.payload?.data.access_token
      state.isLoading = false
    })
    builder.addMatcher(
      isPending(sendCode, checkCode),
      state => {
        state.isLoading = true
      }
    )
    builder.addMatcher(
      isRejected(sendCode, checkCode),
      (state, action) => {
        state.id = null
        state.name = null
        state.email = null
        state.isLoading = false
        state.error = action.payload?.error
      }
    )
  }
})

export const {logout} = userSlice.actions
export default userSlice.reducer