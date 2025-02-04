<script setup lang="ts">
import vLoading from './v-loading.vue'

defineProps<{
  loading?: boolean
}>()
</script>

<template>
  <form :class="{ 'v-form_loading': loading }" class="v-form">
    <slot />
    <v-loading :loading="loading" />
  </form>
</template>

<style scoped lang="scss">
.v-form {
  @include flex-list-column(28px);

  & {
    position: relative;
    transition: opacity 0.2s ease-in-out;
  }

  @include tablet-up {
    gap: 40px;
  }
}

.v-form_loading {
  opacity: 0.5;
  pointer-events: none;
}
</style>
