import { useMutation, useQueryClient } from '@tanstack/react-query';

import { notesApi } from './api';

const useCreateNoteMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: ['CREATE', 'NOTE'],
    mutationFn: notesApi.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['ALL', 'NOTES'] });
    },
  });
};

export { useCreateNoteMutation };
