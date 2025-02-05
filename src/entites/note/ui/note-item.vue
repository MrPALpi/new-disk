<script setup lang="ts">
import type { Note } from '../index.d'
import { VButton } from '@/shared/ui'

defineProps<Note>()

const emit = defineEmits(['delete'])
</script>
<template>
  <div class="note">
    <div class="note__header">
      <h3 class="note__title title-h4">{{ title }}</h3>
    </div>

    <div class="note__content">
      {{ content }}
    </div>
    <div class="note__footer">
      <v-button @click="emit('delete', id)" label="Удалить" icon="close" class="note__delete" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.note {
  height: max-content;
  border-radius: 12px;
  position: relative;
  border-top-right-radius: 0;
  overflow: hidden;
  background-color: $green-light;
  box-shadow: 0px 15px 15px -10px rgba(0, 0, 0, 0.4);

  &::before {
    content: '';
    border-top: 20px solid $dark;
    border-right: 20px solid $dark;
    border-bottom: 20px solid $green;
    border-left: 20px solid $green;
    position: absolute;
    top: 0;
    right: 0;
    border-bottom-left-radius: 20px;
  }
}

.note__header {
  margin-right: 40px;
  padding: 20px 56px 20px 28px;
}

.note__title {
  word-break: break-word;
}

.note__content {
  padding: 20px 28px 28px;
  border-top: 1px solid $green;
  word-break: break-word;
}

.note__footer {
  padding: 8px;
}

.note__delete {
  margin-left: auto;
}
</style>
