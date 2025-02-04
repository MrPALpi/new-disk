<script setup lang="ts">
import { defineModel } from 'vue'
import vButton from './v-button.vue'

interface VModalProps {
  closeBtn?: boolean
  modelValue?: boolean
}

const isOpen = defineModel<VModalProps['modelValue']>('modelValue')

withDefaults(defineProps<VModalProps>(), {
  closeBtn: true,
})

const close = () => {
  isOpen.value = false
}
</script>

<template>
  <teleport to="body">
    <transition name="v-modal">
      <div v-if="isOpen" @click="close" class="v-modal">
        <div @click.stop class="v-modal__content">
          <v-button v-if="closeBtn" @click="close" icon="close" rounded class="v-modal__close" />
          <slot />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped lang="scss">
.v-modal {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  width: 100%;
  height: 100%;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.3);
}

.v-modal__content {
  @include flex-center;

  & {
    flex: auto;
    position: relative;
    padding: 90px 16px 24px;
    border-radius: 40px;
    background-color: $dark-middle;
  }
}

.v-modal__close {
  position: absolute;
  top: 12px;
  right: 12px;
}

@include tablet-up {
  .v-modal {
    padding: 40px;
  }

  .v-modal__content {
    max-width: 600px;
    padding: 56px;
  }

  .v-modal__close {
    top: 20px;
    right: 20px;
  }
}

@include mobile-up {
  .v-modal {
    padding: 40px;
  }
}

@include desktop-up {
  .v-modal__content {
    max-width: 780px;
    padding: 80px;
  }
}

.v-modal-enter-active,
.v-modal-leave-active {
  transition: opacity 0.2s ease-in-out;

  .v-modal__content {
    transition: transform 0.2s ease-in-out;
  }
}

.v-modal-enter-from,
.v-modal-leave-to {
  opacity: 0;

  .v-modal__content {
    transform: scale(1.1);
  }
}
</style>
