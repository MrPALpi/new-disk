<script setup lang="ts">
import { shallowRef } from 'vue'
import { useNoteStore } from '@/entites/note/model'
import { NoteList } from '@/widgets/note-list'
import { NoteAdd } from '@/widgets/note-add'
import { VLoading, VModal, VButton } from '@/shared/ui'

const showModal = shallowRef<boolean>(false)
const noteStore = useNoteStore()
noteStore.fetch()
</script>

<template>
  <div :class="{ 'note-page_loading': noteStore.loading }" class="note-page">
    <note-list />
    <v-loading :loading="noteStore.loading" />
    <v-button icon="plus" @click="showModal = true" rounded class="note-page__add" />
    <v-modal v-model="showModal">
      <note-add @close="showModal = false" />
    </v-modal>
  </div>
</template>

<style lang="scss" scoped>
.note-page {
  transition: opacity 0.2s;
}

.note-page_loading {
  opacity: 0.5;
  pointer-events: none;
}

.note-page__add {
  position: fixed;
  box-shadow: 0px 15px 46px -10px rgba(0, 0, 0, 0.6);
  right: 8px;
  bottom: 40px;

  @include laptop-up {
    right: 12px;
  }

  @include desktop-up {
    right: 40px;
  }
}
</style>
