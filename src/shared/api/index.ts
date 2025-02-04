import { useUserStore } from '@/entites/user'
import axios from 'axios'
import type { AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import type { ApiError } from '@/shared/types'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
  timeout: 10000,
})

axiosInstance.interceptors.request.use(
  (
    config: InternalAxiosRequestConfig<Record<string, string>>,
  ): InternalAxiosRequestConfig<Record<string, string>> => {
    const userStore = useUserStore()

    if (!!userStore.token) {
      config.headers.set('Authorization', `Bearer ${userStore.token}`)
    }

    config.headers.set('Content-Type', 'application/json')

    return config
  },
  (error: AxiosError): Promise<AxiosError> => {
    console.error('Request Error', 'Failed to send request', error)
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: AxiosError): Promise<AxiosError> => {
    const response = error?.response

    if (!response) {
      console.error('Network Error', 'Failed to connect to server')
      return Promise.reject(error)
    }

    const data: ApiError = response.data as ApiError

    if (Array.isArray(data.message)) {
      data.message = data.message.join('. ')
    }

    console.error('[API Error]', {
      statusCode: data?.statusCode,
      message: data?.message,
      error: data?.error,
      url: response.config?.url,
    })

    return Promise.reject(data)
  },
)

export { axiosInstance }
