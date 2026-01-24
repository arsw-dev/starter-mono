import type { Note } from '@/types/notes';

import { apiClient } from '@/utils/api-client';

import type { CreateNote } from './forms/create-note';

const notesApi = {
  getAll: async () => {
    const response = await apiClient.get<Note[]>('/notes');
    return response.data;
  },
  create: async (data: CreateNote) => {
    const response = await apiClient.post<Note>('/notes', data);
    return response.data;
  },
  delete: async (noteId: number) => {
    await apiClient.delete(`/notes/${noteId}`);
  },
};

export { notesApi };
