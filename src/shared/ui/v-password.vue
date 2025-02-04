<script setup lang="ts">
import { shallowRef, computed, defineModel } from 'vue'
import vInput from './v-input.vue'
import svgIcon from './svg-icon.vue'

const model = defineModel<string>('model')
const showPassword = shallowRef<boolean>(false)
const inputType = computed(() => (showPassword.value ? 'text' : 'password'))

const SHOW_ICON = 'eye'
const HIDE_ICON = 'eye-close'
</script>

<template>
  <v-input v-model="model" :type="inputType" placeholder="Введите пароль">
    <template #right>
      <span @click="showPassword = !showPassword">
        <transition name="icon" mode="out-in">
          <svg-icon v-if="showPassword" :name="HIDE_ICON" class="input-label__icon" />
          <svg-icon v-else :name="SHOW_ICON" class="input-label__icon" />
        </transition>
      </span>
    </template>
    <input type="password" />
  </v-input>
</template>

<style scoped lang="scss">
.input-label__icon {
  cursor: pointer;
  margin-right: 12px;
  color: $green-light;
}

.icon-enter-active,
.icon-leave-active {
  transition:
    transform 0.2s ease-in-out,
    opacity 0.2s;
}

.icon-enter-from,
.icon-leave-to {
  opacity: 0;
  transform: scaleY(0);
}
</style>
