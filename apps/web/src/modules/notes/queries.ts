import { useQuery } from '@tanstack/react-query';

import { notesApi } from './api';

const useAllNotesQuery = () => useQuery({
  queryKey: ['ALL', 'NOTES'],
  queryFn: notesApi.getAll,
});

export { useAllNotesQuery };
