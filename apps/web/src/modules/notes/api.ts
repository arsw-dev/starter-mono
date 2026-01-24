import type { Note } from '@/types/notes';

import { apiClient } from '@/utils/api-client';
import { sleep } from '@/utils/async';

const notesApi = {
  getAll: async () => {
    const response = await apiClient.get<Note[]>('/notes');
    await sleep(5000);
    return response.data;
  },
};

export { notesApi };
