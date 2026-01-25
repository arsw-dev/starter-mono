import { Loader2 } from 'lucide-react';

import type { MutationParams } from '@/types/mutations';
import type { Note } from '@/types/notes';

import { Form } from '@/components/form';
import FormInput from '@/components/form/form-input';
import FormTextarea from '@/components/form/form-textarea';

import type { CreateNote } from '../forms/create-note';

import { useCreateNoteForm } from '../forms/create-note';

const CreateNoteForm = ({
  onSuccess,
  onError,
}: MutationParams<Note>) => {
  const { form, onSubmit, isSubmitting } = useCreateNoteForm();

  return (
    <Form
      form={form}
      id="create-note"
      className="space-y-4"
      onSubmit={onSubmit({ onSuccess, onError })}
    >
      <FormInput<CreateNote>
        name="title"
        label="Title"
        required
      />
      <FormTextarea<CreateNote>
        name="note"
        label="Note"
        className="h-30"
        required
      />
      <div className="flex justify-end">
        <button
          type="submit"
          form="create-note"
          className="inline-flex w-30 cursor-pointer items-center justify-center rounded-sm bg-blue-400 px-3 py-1 text-white"
        >
          {isSubmitting ? <Loader2 className="animate-spin" /> : `Create Note`}
        </button>
      </div>
    </Form>
  );
};

export default CreateNoteForm;
