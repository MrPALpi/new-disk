<script setup lang="ts">
import { watchEffect } from 'vue'

const model = defineModel<string>('model')

interface InputProps {
  label?: string
  limit?: number | null
  error?: string | null
}

const props = defineProps<InputProps>()

watchEffect(() => {
  if (!model.value || !props.limit) return

  if (model.value.length > props.limit) {
    model.value = model.value.slice(0, props.limit)
  }
})
</script>

<template>
  <label class="input-label">
    <span v-if="!!label?.length" class="input-label__text text-small">{{ label }}</span>
    <span class="input-label__box">
      <span v-if="$slots.left" class="input-label__box-left">
        <slot name="left" />
      </span>
      <input v-model="model" v-bind="$attrs" class="input-label__field input" />
      <span v-if="$slots.right" class="input-label__box-right">
        <slot name="right" />
      </span>
    </span>
    <span class="input-label__bottom text-small">
      <transition name="error">
        <span v-if="!!error" class="input-label__error">
          {{ error }}
        </span>
      </transition>
      <span v-if="!!limit" class="input-label__bottom-limit">
        {{ typeof model === 'string' ? model.length : model || 0 }} / {{ limit }}
      </span>
    </span>
  </label>
</template>

<style scoped lang="scss">
.error-enter-active,
.error-leave-active {
  transition: all 0.2s ease-in-out;
}

.error-enter-from,
.error-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}
</style>
