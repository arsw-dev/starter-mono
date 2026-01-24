import { sql } from 'drizzle-orm';
import { check, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

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

export { notesTable };
