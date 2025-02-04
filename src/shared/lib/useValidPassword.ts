import { shallowRef, type ShallowRef } from 'vue'

type validPassword = {
  password: ShallowRef<string>
  validatePassword: () => boolean
  errorPassword: ShallowRef<string>
}

export const useValidPassword = (
  minLength: number = 0,
  maxLength: number = Infinity,
): validPassword => {
  const ERROR_MESSAGE_MAX = `Поле не может быть больше ${maxLength} символов`
  const ERROR_MESSAGE_MIN = `Поле не может быть меньше ${minLength} символов`
  const ERROR_MESSAGE_EMPTY = 'Поле не может быть пустым'

  const password = shallowRef<string>('')
  const errorPassword = shallowRef<string>('')

  const validatePassword = (): boolean => {
    const length = password.value.length

    if (length === 0) {
      errorPassword.value = ERROR_MESSAGE_EMPTY
      return false
    }

    if (length < minLength) {
      errorPassword.value = ERROR_MESSAGE_MIN
      return false
    }

    if (length > maxLength) {
      errorPassword.value = ERROR_MESSAGE_MAX
      return false
    }

    errorPassword.value = ''
    return true
  }

  return { password, validatePassword, errorPassword }
}
