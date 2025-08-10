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

let isRefreshing = false
let refreshPromise: Promise<string> | null = null
const refreshSubscribers: Array<(token: string | null) => void> = []

const subscribeTokenRefresh = (cb: (t: string | null) => void) => refreshSubscribers.push(cb)
const onTokenRefreshed = (token: string | null) => {
  refreshSubscribers.splice(0).forEach((cb) => cb(token))
}

const rawSso = axios.create({ baseURL: API_AUTH_URL, withCredentials: true })

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
      const accessToken = localStorage.getItem('access_token')
      const url = original?.url ?? ""

      if (url.endsWith("refresh-token")) {
        return Promise.reject(makeError(error.message, error.response?.data?.error, true))
      }

      if ((status === 401 || status === 403)) {
        if (!accessToken) {
          return Promise.reject(makeError(error.message, error.response?.data?.error, true))
        }
        if (original?._retry) {
          return Promise.reject(makeError(error.message, error.response?.data?.error, true))
        }
        if (isRefreshing && refreshPromise) {
          return new Promise((resolve, reject) => {
            subscribeTokenRefresh((newToken) => {
              if (!original) return reject(error)
              if (!newToken) return reject(makeError(error.message, error?.response?.data?.error, true))
              original._retry = true
              original.headers = { ...(original.headers ?? {}), Authorization: `Bearer ${newToken}` }
              resolve(instance.request(original))
            })
          })
        }

        isRefreshing = true
        original!._retry = true

        refreshPromise = rawSso
          .post<AxiosResponse<UserAccessCodeData>>("refresh-token", null, { withCredentials: true })
          .then((resp) => {
            const newAccess = (resp?.data?.data?.data?.access_token ?? resp?.data?.data?.data?.access_token) as string | undefined // TODO ПЕДЕЛАТЬ ОТВЕТ С БЭКА
            if (!newAccess) throw new Error("No access token in refresh response")
            localStorage.setItem("access_token", newAccess)
            onTokenRefreshed(newAccess)
            return newAccess
          })
          .catch((refreshErr) => {
            onTokenRefreshed(null)
            throw makeError(
              refreshErr?.message ?? "Refresh failed",
              refreshErr?.response?.data?.error,
              true
            )
          })
          .finally(() => {
            isRefreshing = false
            refreshPromise = null
          })

        const newToken = await refreshPromise

        if (!original) return Promise.reject(error)
        original.headers = { ...(original.headers ?? {}), Authorization: `Bearer ${newToken}` }
        return instance.request(original)
      }

      return Promise.reject(makeError(error.message, error?.response?.data?.error))
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

  async put<T>(
    endpoint: string,
    formData: FormData,
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axios.put(
      endpoint,
      formData,
      options
    )
    if (axios.isAxiosError(response)) {
      return Promise.reject(response)
    }
    return response.data
  }

  async delete<T>(
    endpoint: string,
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axios.delete(
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
