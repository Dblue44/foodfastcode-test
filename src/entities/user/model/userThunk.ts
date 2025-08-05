import {createAsyncThunk} from "@reduxjs/toolkit";
import type {
  ErrorType,
  RejectedSignInType,
  PhoneForm,
  LoginOtp,
  UserSendCodeData,
  UserAccessCodeData
} from "@shared/types";
import {sendCodeSync, checkCodeSync, refreshTokenSync} from "@shared/api/user";


export const sendCode = createAsyncThunk<
  UserSendCodeData,
  PhoneForm,
  { readonly rejectValue: RejectedSignInType }
> ("user/sendCode", async (data: PhoneForm, thunkAPI) => {
  try {
    return await sendCodeSync(data)
  } catch (err) {
    const axiosError = err as ErrorType
    return thunkAPI.rejectWithValue({
      error: axiosError.response?.data?.error || axiosError.message || "Unknown error occurred",
    })
  }
})

export const checkCode = createAsyncThunk<
  UserAccessCodeData,
  LoginOtp,
  { readonly rejectValue: RejectedSignInType }
>("user/checkCode", async (data: LoginOtp, thunkAPI) => {
  try {
    return await checkCodeSync(data)
  } catch (err) {
    const axiosError = err as ErrorType
    return thunkAPI.rejectWithValue({
      error: axiosError.response?.data?.error || axiosError.message || "Unknown error occurred",
    })
  }
})

export const refreshToken = createAsyncThunk<
  UserAccessCodeData,
  string,
  { readonly rejectValue: RejectedSignInType }
>("user/refreshToken", async (accessToken, thunkAPI) => {
  try {
    return await refreshTokenSync(accessToken)
  } catch (err) {
    const knownError = err as ErrorType
    return thunkAPI.rejectWithValue({
      error: knownError.message,
    })
  }
})