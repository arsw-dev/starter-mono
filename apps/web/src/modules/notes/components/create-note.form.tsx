import { Loader2 } from 'lucide-react';
import { Controller } from 'react-hook-form';

import type { MutationParams } from '@/types/mutations';

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import type { CreateNote } from '../forms/create-note';

import { useCreateNoteForm } from '../forms/create-note';

const CreateNoteForm = ({
  onSuccess,
  onError,
}: MutationParams<CreateNote>) => {
  const { form, onSubmit, isSubmitting } = useCreateNoteForm();

  return (
    <form
      id="create-note"
      className="space-y-2"
      onSubmit={onSubmit({ onSuccess, onError })}
    >
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="create-note-name">
                Name
              </FieldLabel>
              <Input
                {...field}
                id="create-note-name"
                aria-invalid={fieldState.invalid}
                placeholder="Note name"
                autoComplete="off"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          name="note"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="create-note-note">
                Note
              </FieldLabel>
              <Textarea
                {...field}
                id="create-note-note"
                aria-invalid={fieldState.invalid}
                placeholder="Note"
                autoComplete="off"
                className="h-30 resize-none"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      </FieldGroup>
      <div className="flex justify-end">
        <button
          type="submit"
          form="create-note"
          className="inline-flex w-30 cursor-pointer items-center justify-center rounded-sm bg-blue-400 px-3 py-1 text-white"
        >
          {isSubmitting ? <Loader2 className="animate-spin" /> : `Create Note`}
        </button>
      </div>
    </form>
  );
};

export default CreateNoteForm;
