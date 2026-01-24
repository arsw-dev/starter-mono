import type { Note } from '@/types/notes';

import { apiClient } from '@/utils/api-client';
import { sleep } from '@/utils/async';

import type { CreateNote } from './forms/create-note';

const notesApi = {
  getAll: async () => {
    const response = await apiClient.get<Note[]>('/notes');
    await sleep(5000);
    return response.data;
  },
  create: async (data: CreateNote) => {
    await sleep(5000);
    const response = await apiClient.post<Note>('/notes', data);
    return response.data;
  },
};

export { notesApi };
