import {apiSsoInstance} from "@shared/api";
import type {UserSendCodeData, UserAccessCodeData, PhoneForm, LoginOtp} from "@shared/types";

export const sendCodeSync = (data: PhoneForm): Promise<UserSendCodeData> => {
  const formData = new FormData()
  formData.append('phone', data.phone)
  return apiSsoInstance.post<UserSendCodeData>("send-code", formData)
}

export const checkCodeSync = (data: LoginOtp): Promise<UserAccessCodeData> => {
  const formData = new FormData()
  formData.append('code', data.code)
  formData.append('phone', data.phone)
  return apiSsoInstance.post<UserAccessCodeData>("check-code", formData)
}

export const refreshTokenSync = (accessToken: string) : Promise<UserAccessCodeData> => {
  if (!accessToken) {
    return Promise.reject(new Error("No access token available"));
  }
  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };
  return apiSsoInstance.postRefreshToken<UserAccessCodeData>("refresh-token", options)
}