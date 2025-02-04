<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{ closeClickContent: boolean }>()

const visible = ref(false)
const trigger = ref<HTMLElement | null>(null)
const popover = ref<HTMLElement | null>(null)

const popoverStyle = computed(() => {
  if (!trigger.value || !popover.value) return {}

  const { top, left, width } = trigger.value.getBoundingClientRect()
  return {
    top: `${top + window.scrollY + 70}px`,
    left: `${left + window.scrollX + width - popover.value.clientWidth + 20}px`,

    '--arrow-place': `${popover.value.offsetWidth / 2}px`,
  }
})

const toggle = () => {
  visible.value = !visible.value
}

const close = (event: Event) => {
  const isClickTrigger = Object.is((event as MouseEvent).relatedTarget, trigger.value)
  const isClickOutside = !(event as MouseEvent).relatedTarget

  if (props.closeClickContent || isClickOutside || isClickTrigger) {
    visible.value = false
  }
}
</script>

<template>
  <div ref="trigger" @click="toggle" @blur="close" class="popover-trigger" tabindex="-1">
    <slot name="trigger" />
  </div>

  <teleport to="body">
    <transition name="popover">
      <div
        v-if="visible"
        ref="popover"
        :style="popoverStyle"
        @blur="close"
        class="popover"
        tabindex="-1"
      >
        <slot name="content" />
      </div>
    </transition>
  </teleport>
</template>

<style scoped lang="scss">
.popover-trigger {
  display: inline-block;
}

.popover {
  position: absolute;
  z-index: 2;
  padding: 40px;
  border-radius: 12px;
  background-color: $dark-middle;
  box-shadow: 0px 15px 46px -10px rgba(0, 0, 0, 0.6);

  &::before {
    content: '';
    position: absolute;
    bottom: 100%;
    right: 18px;
    width: 18px;
    height: 9px;
    height: 20px;
    border: 10px solid transparent;
    border-bottom: 10px solid $dark-middle;
  }
}

.popover-enter-active,
.popover-leave-active {
  transition:
    opacity 0.2s ease-in-out,
    transform 0.2s ease-in-out;
}

.popover-enter-from,
.popover-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
