<script setup lang="ts">
import { NoteItem, useNoteStore } from '@/entites/note'
const noteStore = useNoteStore()

const deletaNote = async (id: number) => noteStore.deleteNote(id)

const setStaticWidth = (node: Element): void => {
  ;(node as HTMLElement).style.width = (node as HTMLElement).offsetWidth + 'px'
}
</script>
<template>
  <div v-if="noteStore.notes.length" class="note-list">
    <transition-group name="note-list" @before-leave="setStaticWidth">
      <note-item
        v-for="note in noteStore.notes"
        :key="note.id"
        v-bind="note"
        @delete="deletaNote"
      />
    </transition-group>
  </div>
  <div v-else class="note-list-empty title-h1">Заметок нет</div>
</template>

<style scoped lang="scss">
.note-list {
  --column-wdith: 355px;
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, var(--column-wdith)), 1fr));
  gap: 20px;

  @include desktop-up {
    --column-wdith: 380px;
    gap: 40px;
  }
}

.note-list-empty {
  text-align: center;
}

.note-list-move,
.note-list-enter-active,
.note-list-leave-active {
  transition: all 0.3s;
}

.note-list-enter-from,
.note-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.note-list-leave-active {
  position: absolute;
}
</style>
