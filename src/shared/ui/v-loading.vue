<template>
  <transition name="v-loading">
    <div class="loader" v-show="loading"></div>
  </transition>
</template>

<script setup lang="ts">
interface Props {
  loading?: boolean
  size?: string
}

withDefaults(defineProps<Props>(), {
  size: '100px',
  loading: false,
})
</script>

<style scoped lang="scss">
.loader {
  position: absolute;
  z-index: 2;
  --place: calc(50% - v-bind(size) / 2);
  top: var(--place);
  left: var(--place);
  width: v-bind(size);
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(farthest-side, $green 94%, #0000) top/8px 8px no-repeat,
    conic-gradient(#0000 30%, $green);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
  animation: rotate 1s infinite linear;
}
@keyframes rotate {
  100% {
    transform: rotate(1turn);
  }
}

.v-loading-enter-active,
.v-loading-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.v-loading-enter-from,
.v-loading-leave-to {
  opacity: 0;
}
</style>
