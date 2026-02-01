import type { Note } from '@starter-mono/types';

import type { CreateNote } from './schema';
import type { MutationParams } from '@/types/mutations';

import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { useCreateNoteMutation } from '../../mutations';
import { createNoteSchema } from './schema';

const useCreateNoteForm = () => {
  const form = useForm<CreateNote>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: '',
      note: '',
    },
  });

  const mutation = useCreateNoteMutation();

  const onSubmit = (params?: MutationParams<Note>) =>
    form.handleSubmit((values) => {
      mutation.mutate(values, params);
    });

  return { form, onSubmit, isSubmitting: mutation.isPending };
};

export { useCreateNoteForm };
