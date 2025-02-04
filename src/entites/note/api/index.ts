import { axiosInstance } from '@/shared/api'
import type { Note, NoteList } from '../index.d'
import type { ApiError } from '@/shared/types'

export const noteApi = {
  async fetch(): Promise<NoteList | ApiError> {
    const response = await axiosInstance.get('/api/notes')
    return response?.data
  },

  async add(note: Note): Promise<Note | ApiError> {
    const response = await axiosInstance.post('/api/notes', note)
    return response?.data
  },
  async delete(id: number): Promise<string | ApiError> {
    const response = await axiosInstance.delete(`/api/notes/${id}`)
    return response?.data
  },
}
