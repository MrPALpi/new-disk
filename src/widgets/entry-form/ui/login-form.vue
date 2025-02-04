<script setup lang="ts">
import { shallowRef } from 'vue'
import { useUserStore } from '@/entites/user'
import { VInput, VPassword, VButton, VForm } from '@/shared/ui'
import { useValidEmail, useValidPassword } from '@/shared/lib'
import type { Action } from '@/shared/types'

const userStore = useUserStore()
const emit = defineEmits(['to-sign-up', 'next-page'])

const { email, validateEmail, errorEmail } = useValidEmail()
const { password, validatePassword, errorPassword } = useValidPassword(4, 12)

const loading = shallowRef<boolean>(false)
const errorMessage = shallowRef<string>('')
const isFormValid = () => validateEmail() && validatePassword()

const setErrorMessage = (message: string = '') => {
  errorMessage.value = message

  setTimeout(() => {
    errorMessage.value = ''
  }, 5000)
}

const submitHandler = async (): Promise<void> => {
  if (!isFormValid()) {
    return
  }

  loading.value = true

  try {
    const result: Action = await userStore.login(email.value, password.value)
    if (result.status) {
      return emit('next-page')
    }

    setErrorMessage(result.message)
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <v-form @submit.prevent="submitHandler" :loading="loading" class="login-form form">
    <h2 class="title-h2">Вход в ваш аккаунт</h2>
    <div class="form__inputs">
      <v-input
        v-model="email"
        @change="validateEmail"
        :error="errorEmail"
        name="email"
        label="Email"
        placeholder="Введите email"
        type="email"
      />
      <v-password
        v-model="password"
        @change="validatePassword"
        :error="errorPassword"
        name="password"
        label="Пароль"
        placeholder="Введите пароль"
      />
    </div>
    <div class="form__bottom">
      <span class="form__bottom-text text-small"
        >У вас нет аккаунта?
        <a href="#" @click.prevent="emit('to-sign-up')">Зарегистрируйтесь</a>
      </span>

      <v-button label="Войти" type="submit" class="form__submit" />

      <transition name="form-error">
        <div v-if="!!errorMessage" class="form__error text-small">
          {{ errorMessage }}
        </div>
      </transition>
    </div>
  </v-form>
</template>
