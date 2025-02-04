import { shallowRef, type ShallowRef } from 'vue'

type validConfirmPassword = {
  confirmPassword: ShallowRef<string>
  validateConfirmPassword: () => boolean
  errorConfirmPassword: ShallowRef<string>
}

const ERROR_MESSAGE_EMPTY = 'Поле не может быть пустым'
const ERROR_MESSAGE = 'Пароли не совпадают'

export const useValidConfirmPassword = (password: ShallowRef<string>): validConfirmPassword => {
  const confirmPassword = shallowRef<string>('')
  const errorConfirmPassword = shallowRef<string>('')

  const validateConfirmPassword = (): boolean => {
    const length = confirmPassword.value.length
    const valid = !!length && password.value === confirmPassword.value

    errorConfirmPassword.value = valid ? '' : length ? ERROR_MESSAGE : ERROR_MESSAGE_EMPTY

    return valid
  }

  return {
    confirmPassword,
    validateConfirmPassword,
    errorConfirmPassword,
  }
}
