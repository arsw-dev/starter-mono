import { sql } from 'drizzle-orm';
import { check, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import z from 'zod';

const notesTable = pgTable('notes', {
  id: serial().primaryKey(),
  name: varchar({ length: 256 }).notNull(),
  note: varchar({ length: 256 }).notNull(),
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
const insertNotesSchema = createInsertSchema(notesTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  name: z.string().min(1, 'name is required'),
  note: z.string().min(1, 'note is required'),
});

export {
  insertNotesSchema,
  notesTable,
  selectNotesSchema,
};
