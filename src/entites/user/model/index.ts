import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { userApi } from '../api'
import type { ApiError, Action } from '@/shared/types'
import type { Login, GetUser } from '../index.d'

export const useUserStore = defineStore('user', () => {
  const id: Ref<number | null> = ref(null)
  const email: Ref<string | null> = ref(null)
  const token: Ref<string | null> = ref(null)
  const isAuth = computed((): boolean => !!token.value && !!email.value)

  const initialize = async (): Promise<void> => {
    if (token.value !== null) {
      return
    }

    const accessToken = localStorage.getItem('access_token')

    if (!accessToken) {
      return
    }

    token.value = accessToken

    try {
      const userData: GetUser | ApiError = await userApi.getUser()

      if ('id' in userData && 'email' in userData) {
        id.value = userData?.id || null
        email.value = userData?.email || null
      }
    } catch (error) {
      console.error(error)
    }
  }

  const login = async (userEmail: string, password: string): Promise<Action> => {
    try {
      const data: Login | ApiError = await userApi.login(userEmail, password)

      if ('accessToken' in data) {
        email.value = userEmail
        token.value = data.accessToken
        localStorage.setItem('access_token', data.accessToken)
        return { status: true }
      } else {
        throw data
      }
    } catch (error: unknown) {
      const { statusCode, message } = error as ApiError
      return {
        status: false,
        message: statusCode?.toString()?.startsWith('4') ? message : 'Something went wrong',
      }
    }
  }

  const signUp = async (
    userEmail: string,
    password: string,
    confirm_password: string,
  ): Promise<Action> => {
    try {
      const result = await userApi.signUp(userEmail, password, confirm_password)
      if ('id' in result && 'email' in result) {
        id.value = result.id
        email.value = result.email
        return { status: true }
      } else {
        throw result
      }
    } catch (error: unknown) {
      const { statusCode, message } = error as ApiError
      return {
        status: false,
        message: statusCode?.toString()?.startsWith('4') ? message : 'Something went wrong',
      }
    }
  }

  const logout = async (): Promise<void> => {
    const result = await userApi.logout()

    if (result.status) {
      id.value = null
      email.value = null
      token.value = null
      localStorage.removeItem('access_token')
    }
  }

  return { id, email, isAuth, token, signUp, login, initialize, logout }
})
