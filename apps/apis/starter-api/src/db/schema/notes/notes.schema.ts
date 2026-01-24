import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import z from 'zod';

import { notesTable } from './notes.table';

const selectNotesSchema = createSelectSchema(notesTable);

const insertNotesSchema = createInsertSchema(notesTable, {
  name: z.string().min(1).max(256),
  note: z.string().min(1),
}).pick({
  name: true,
  note: true,
});

const patchNoteSchema = insertNotesSchema.partial().refine(
  data => Object.keys(data).length > 0,
  {
    message: 'At least one field must be provided',
  },
);

export { insertNotesSchema, patchNoteSchema, selectNotesSchema };
