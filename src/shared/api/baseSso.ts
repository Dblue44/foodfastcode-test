import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import {CONFIG} from "@/config";

export const API_AUTH_URL = CONFIG.API_AUTH_URL

export class ApiSsoInstance {
  private axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      baseURL: API_AUTH_URL,
      timeout: 120000,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  async post<T>(
    endpoint: string,
    formData: FormData,
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axios.post(
      endpoint,
      formData,
      options
    )
    if (axios.isAxiosError(response)) {
      return Promise.reject(response)
    }
    return response.data
  }

  async postRefreshToken<T>(
    endpoint: string,
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axios.post(
      endpoint,
      null,
      options
    )
    if (axios.isAxiosError(response)) {
      return Promise.reject(response)
    }
    return response.data
  }
}

export const apiSsoInstance = new ApiSsoInstance()
