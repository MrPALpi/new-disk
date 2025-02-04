<script setup lang="ts">
import { shallowRef } from 'vue'
import { useNoteStore } from '@/entites/note'
import { VForm, VInput, VButton } from '@/shared/ui'

const emit = defineEmits(['close'])

const noteStore = useNoteStore()
const errorMessage = shallowRef<string>('')
const title = shallowRef<string>('')
const content = shallowRef<string>('')

const setErrorMessage = (message: string = '') => {
  errorMessage.value = message
  setTimeout(() => {
    errorMessage.value = ''
  }, 5000)
}

const addNote = async (): Promise<void> => {
  try {
    const result = await noteStore.add({ title: title.value, content: content.value })
    title.value = ''
    content.value = ''

    if (result.status) {
      return emit('close')
    }

    setErrorMessage(result.message)
  } catch (error) {
    console.error(error)
  }
}
</script>
<template>
  <v-form @submit.prevent="addNote" class="add-note form" :loading="noteStore.loading">
    <h2 class="title-h2">Добавление заметки</h2>
    <div class="form__inputs">
      <v-input
        v-model="title"
        :limit="32"
        name="title"
        label="Название заметки"
        placeholder="Введите название"
      />

      <v-input
        v-model="content"
        :limit="128"
        name="title"
        label="Текст заметки"
        placeholder="Введите текст"
      />
    </div>
    <div class="form__bottom">
      <v-button label="Добавить" type="submit" class="form__submit" />

      <transition name="form-error">
        <div v-if="!!errorMessage" class="form__error text-small">
          {{ errorMessage }}
        </div>
      </transition>
    </div>
  </v-form>
</template>

<style scoped lang="scss"></style>
