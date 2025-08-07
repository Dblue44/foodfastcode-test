import {apiSsoInstance} from "@shared/api";
import type {
  UserSendCodeData,
  UserAccessCodeData,
  PhoneForm,
  LoginOtp,
  UserStateResponse
} from "@shared/types";

export const sendCodeRequest = (data: PhoneForm): Promise<UserSendCodeData> => {
  const formData = new FormData()
  formData.append('phone', data.phone)
  return apiSsoInstance.post<UserSendCodeData>("send-code", formData)
}

export const checkCodeRequest = (data: LoginOtp): Promise<UserAccessCodeData> => {
  const formData = new FormData()
  formData.append('code', data.code)
  formData.append('phone', data.phone)
  return apiSsoInstance.post<UserAccessCodeData>("check-code", formData)
}

export const getUserRequest = () : Promise<UserStateResponse> => {
  return apiSsoInstance.get<UserStateResponse>("user")
}