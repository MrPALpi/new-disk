import { shallowRef, type ShallowRef } from 'vue'

type validEmail = {
  email: ShallowRef<string>
  validateEmail: () => boolean
  errorEmail: ShallowRef<string>
}

const ERROR_MESSAGE_EMPTY = 'Поле не может быть пустым'
const ERROR_MESSAGE = 'Некорректная почта'
const EMAIL_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu

export const useValidEmail = (): validEmail => {
  const email = shallowRef<string>('')
  const errorEmail = shallowRef<string>('')

  const validateEmail = (): boolean => {
    const length = email.value.length

    if (!length) {
      errorEmail.value = ERROR_MESSAGE_EMPTY
      return false
    }

    const valid = EMAIL_REGEXP.test(email.value)

    errorEmail.value = valid ? '' : ERROR_MESSAGE

    return valid
  }

  return {
    email,
    validateEmail,
    errorEmail,
  }
}
