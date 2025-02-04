<script setup lang="ts">
import { shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import { LoginForm, SignUpForm } from './ui'

const emit = defineEmits(['close'])
const router = useRouter()
const showLogin = shallowRef<boolean>(true)

const nextPage = () => {
  emit('close')
  router.push({ name: 'note' })
}
</script>
<template>
  <transition name="form" mode="out-in">
    <login-form v-if="showLogin" @to-sign-up="showLogin = false" @next-page="nextPage" />
    <sign-up-form v-else @to-login="showLogin = true" @next-page="nextPage" />
  </transition>
</template>

<style scoped lang="scss">
.form-enter-active,
.form-leave-active {
  transition: opacity 0.2s;
}

.form-enter-from,
.form-leave-to {
  opacity: 0;
}
</style>
