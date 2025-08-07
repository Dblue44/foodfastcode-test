import axios from 'axios'
import type {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios'
import {CONFIG} from "@/config";
import {type ErrorLineType, errorLineTypeSchema, type UserAccessCodeData} from "@shared/types";

export const API_AUTH_URL = CONFIG.API_AUTH_URL
export const API_BASE_URL = CONFIG.API_BASE_URL

const makeError = (msg: string, resp: string, authError = false): ErrorLineType => {
  const errObj: ErrorLineType = {
    message: msg,
    response: resp,
    error: resp,
    isAuthError: authError,
  }
  return errorLineTypeSchema.parse(errObj)
}

function applyAuthRequestInterceptor(instance: AxiosInstance) {
  instance.interceptors.request.use(
    config => {
      const token = localStorage.getItem('access_token')
      if (token) {
        config.headers = config.headers ?? {}
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    },
    err => Promise.reject(err),
  )
}

function applySsoResponseInterceptor(instance: AxiosInstance) {
  instance.interceptors.response.use(
    (response) => {
      const url = response.config.url ?? ''
      if (
        url.endsWith('check-code') ||
        url.endsWith('refresh-token')
      ) {
        const knowResponse = response.data as UserAccessCodeData
        if (knowResponse.data.access_token) {
          localStorage.setItem('access_token', knowResponse.data.access_token)
        }
      }
      return response
    },
    async (error) => {
      const status = error.response?.status
      const original = error.config
      if (status === 401 && !original._retry) {
        original._retry = true
        const refreshToken = localStorage.getItem('refresh_token')
        if (refreshToken) {
          try {
            const refreshResponse: AxiosResponse<UserAccessCodeData> = await instance.post(
              'refresh-token',
              null,
              { withCredentials: true }
            )
            const newAccess = refreshResponse.data.data.access_token
            if (newAccess) {
              localStorage.setItem('access_token', newAccess)
              original.headers['Authorization'] = `Bearer ${newAccess}`
              return instance.request(original)
            }
          } catch (refreshError) {
            const knowRefreshError = refreshError as ErrorLineType
            knowRefreshError.isAuthError = true
            return Promise.reject(knowRefreshError)
          }
        }
      }
      return Promise.reject(makeError(error.message, error.response?.data.error, true))
    }
  )
}

export class ApiSsoInstance {
  private axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      baseURL: API_AUTH_URL,
      timeout: 120000,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    applyAuthRequestInterceptor(this.axios)
    applySsoResponseInterceptor(this.axios)
  }

  async get<T>(
    endpoint: string,
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axios.get(
      endpoint,
      options
    )
    if (axios.isAxiosError(response)) {
      return Promise.reject(response)
    }
    return response.data
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
}

export const apiSsoInstance = new ApiSsoInstance()

export class ApiBaseInstance {
  private axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      baseURL: API_BASE_URL,
      timeout: 120000,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    applyAuthRequestInterceptor(this.axios)
    applySsoResponseInterceptor(this.axios)
  }

  async get<T>(
    endpoint: string,
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axios.get(
      endpoint,
      options
    )
    if (axios.isAxiosError(response)) {
      return Promise.reject(response)
    }
    return response.data
  }
}

export const apiBaseInstance = new ApiBaseInstance()
