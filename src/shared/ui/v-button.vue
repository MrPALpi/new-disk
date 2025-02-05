<script setup lang="ts">
import VIcon from './v-icon.vue'

defineProps({
  label: String,
  icon: String,
  iconPos: { type: String, defautl: 'left' },
  rounded: Boolean,
})
</script>

<template>
  <button
    :class="{ [`btn_pos-icon-${iconPos}`]: iconPos, btn_rounded: rounded }"
    class="btn text-normal"
  >
    <v-icon v-if="icon" :name="icon" class="btn__icon" />
    <template v-if="label">
      {{ label }}
    </template>
  </button>
</template>

<style scoped lang="scss">
.btn {
  @include flex-center;

  & {
    gap: 12px;
    height: 56px;
    padding: 0 24px;
    border: none;
    border-radius: 32px;
    cursor: pointer;
    background-color: $green-light;
    color: inherit;
    transition: background-color 0.2s ease-in-out;

    @include hover {
      &:hover {
        background-color: $green-middle;
      }
    }

    &:active {
      background-color: $green-dark;
    }

    &:disabled {
      background-color: $gray;
      cursor: not-allowed;
    }
  }
}

.btn_pos-icon-right {
  flex-direction: row-reverse;
}

.btn_pos-icon-top {
  flex-direction: column;
  justify-content: center;
}

.btn_pos-icon-bottom {
  flex-direction: column-reverse;
  justify-content: center;
}

.btn_rounded {
  height: 56px;
  width: 56px;
  border-radius: 50%;
}

.btn__icon {
  flex: 0 0 auto;
}
</style>
