import type { AxiosResponse } from 'axios'
import { axiosInstance } from '@/shared/api'
import type { Login, GetUser } from '../index.d'
import type { ApiError } from '@/shared/types'

export const userApi = {
  async getUser(): Promise<GetUser | ApiError> {
    const response = await axiosInstance.get('/api/auth')
    return response?.data
  },

  async login(email: string, password: string): Promise<Login | ApiError> {
    const response = await axiosInstance.post('/api/auth', { email, password })
    return response?.data
  },

  async signUp(
    email: string,
    password: string,
    confirm_password: string,
  ): Promise<GetUser | ApiError> {
    const response = await axiosInstance.post('/api/reg', { email, password, confirm_password })
    return response?.data
  },

  async logout(): Promise<AxiosResponse> {
    const result = await axiosInstance.delete('/api/auth')
    return result
  },
}
