import {createAsyncThunk} from "@reduxjs/toolkit";
import type {
  RejectedSsoType,
  PhoneForm,
  LoginOtp,
  UserSendCodeData,
  UserAccessCodeData,
  ErrorLineType, UserStateResponse
} from "@shared/types";
import {sendCodeRequest, checkCodeRequest, getUserRequest } from "@shared/api/user";


export const sendCode = createAsyncThunk<
  UserSendCodeData,
  PhoneForm,
  { readonly rejectValue: RejectedSsoType }
>("user/sendCode", async (data: PhoneForm, thunkAPI) => {
  try {
    return await sendCodeRequest(data)
  } catch (err) {
    const knownError = err as ErrorLineType
    return thunkAPI.rejectWithValue({
      error: knownError.error || knownError.response || knownError.message || "Unknown error occurred",
      isAuthError: knownError.isAuthError
    })
  }
})

export const checkCode = createAsyncThunk<
  UserAccessCodeData,
  LoginOtp,
  { readonly rejectValue: RejectedSsoType }
>("user/checkCode", async (data: LoginOtp, thunkAPI) => {
  try {
    return await checkCodeRequest(data)
  } catch (err) {
    const knownError = err as ErrorLineType
    return thunkAPI.rejectWithValue({
      error: knownError.error || knownError.response || knownError.message || "Unknown error occurred",
      isAuthError: knownError.isAuthError
    })
  }
})

export const getUser = createAsyncThunk<
  UserStateResponse,
  void,
  { readonly rejectValue: RejectedSsoType }
>("user/getUser", async (_, thunkAPI) => {
  try {
    return await getUserRequest()
  } catch (err) {
    const knownError = err as ErrorLineType
    return thunkAPI.rejectWithValue({
      error: knownError.error || knownError.response || knownError.message || "Unknown error occurred",
      isAuthError: knownError.isAuthError
    })
  }
})