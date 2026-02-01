import type z from 'zod';

import type {
  insertNotesSchema,
  patchNoteSchema,
  selectNotesSchema,
} from './notes.schema';

type Note = z.infer<typeof selectNotesSchema>;
type CreateNote = z.infer<typeof insertNotesSchema>;
type UpdateNote = z.infer<typeof patchNoteSchema>;

export type { CreateNote, Note, UpdateNote };
