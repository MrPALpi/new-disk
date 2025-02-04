import { ref, shallowRef, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { noteApi } from '../api'
import type { Note, NoteList } from '../index.d'
import type { ApiError, Action } from '@/shared/types'

export const useNoteStore = defineStore('note', () => {
  const notes: Ref<NoteList> = ref([])
  const loading = shallowRef<boolean>(false)

  const fetch = async (): Promise<Action> => {
    loading.value = true
    try {
      const data = await noteApi.fetch()

      if (Array.isArray(data)) {
        notes.value = data
        return { status: true }
      } else {
        throw data
      }
    } catch (error: unknown) {
      const { statusCode, message } = error as ApiError
      return {
        status: false,
        message: statusCode?.toString()?.startsWith('4') ? message : 'Something went wrong',
      }
    } finally {
      loading.value = false
    }
  }

  const add = async (note: Note): Promise<Action> => {
    loading.value = true
    try {
      const newNote: Note | ApiError = await noteApi.add(note)

      if ('title' in newNote && 'content' in newNote) {
        notes.value.push(newNote)
        return { status: true }
      } else {
        throw newNote
      }
    } catch (error: unknown) {
      const { statusCode, message } = error as ApiError
      return {
        status: false,
        message: statusCode?.toString()?.startsWith('4') ? message : 'Something went wrong',
      }
    } finally {
      loading.value = false
    }
  }

  const deleteNote = async (id: number): Promise<Action> => {
    loading.value = true
    try {
      await noteApi.delete(id)
      notes.value = notes.value.filter((note) => note.id !== id)
      return { status: true }
    } catch (error: unknown) {
      const { statusCode, message } = error as ApiError
      return {
        status: false,
        message: statusCode?.toString()?.startsWith('4') ? message : 'Something went wrong',
      }
    } finally {
      loading.value = false
    }
  }

  return { notes, fetch, add, deleteNote, loading }
})
