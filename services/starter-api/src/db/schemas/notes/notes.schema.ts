import type { Note } from '@starter-mono/types';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import z from 'zod';
import { withExample } from '@/http/openapi';
import { notesTable, NoteType } from './notes.table';

const noteExample: Note = {
  id: 17,
  title: 'Groceries',
  note: 'Eggs',
  subtitle: '01/28',
  noteType: NoteType.shopping,
  priority: 0,
  archived: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const selectNotesSchema = withExample(
  createSelectSchema(notesTable),
  noteExample,
);

const insertNotesSchema = withExample(
  createInsertSchema(notesTable, {
    title: z.string().trim().min(1).max(256),
    note: z.string().trim().min(1),
    subtitle: z.string().trim().min(1).nullable().optional(),
    noteType: z.enum(NoteType).optional().default(NoteType.general),
    archived: z.boolean().optional().default(false),
    priority: z.number()
      .int()
      .min(0)
      .nullable()
      .optional()
      .default(0),
  }),
  noteExample,
).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

const patchNoteSchema = z.object(insertNotesSchema.shape).partial().refine(
  data => Object.keys(data).length > 0,
  {
    message: 'At least one field must be provided',
  },
);

export { insertNotesSchema, patchNoteSchema, selectNotesSchema };
