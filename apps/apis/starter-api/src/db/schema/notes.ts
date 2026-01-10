import { sql } from 'drizzle-orm';
import { check, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import z from 'zod';

const notesTable = pgTable('notes', {
  id: serial().primaryKey(),
  name: varchar({ length: 256 }).notNull(),
  note: text().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
}, t => [
  check(
    'note_min_length',
    sql`char_length(${t.note}) >= 1`,
  ),
  check(
    'name_min_length',
    sql`char_length(${t.name}) >= 1`,
  ),
]);

const selectNotesSchema = createSelectSchema(notesTable);

const insertNotesSchema = createInsertSchema(notesTable, {
  name: z.string().min(1).max(256),
  note: z.string().min(1),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

const patchNoteSchema = insertNotesSchema.partial().refine(
  data => Object.keys(data).length > 0,
  {
    message: 'At least one field must be provided',
  },
);

export {
  insertNotesSchema,
  notesTable,
  patchNoteSchema,
  selectNotesSchema,
};
