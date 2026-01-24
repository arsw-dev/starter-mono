import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import type { MutationParams } from '@/types/mutations';

import type { CreateNote } from './schema';

import { useCreateNoteMutation } from '../../mutations';
import { createNoteSchema } from './schema';

const useCreateNoteForm = () => {
  const form = useForm<CreateNote>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      name: '',
      note: '',
    },
  });

  const mutation = useCreateNoteMutation();

  const onSubmit = (params?: MutationParams<CreateNote>) =>
    form.handleSubmit((values) => {
      mutation.mutate(values, params);
    });

  return { form, onSubmit, isSubmitting: mutation.isPending };
};

export { useCreateNoteForm };
