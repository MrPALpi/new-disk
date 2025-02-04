<script setup lang="ts">
import { defineModel, watchEffect } from 'vue'

const model = defineModel<string>('model')
interface InputProps {
  label?: string
  limit?: number
  error?: string
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
      <textarea v-model="model" v-bind="$attrs" class="input-label__area input" />
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
.input-label__area {
  resize: none;
  height: 280px;
}
</style>
