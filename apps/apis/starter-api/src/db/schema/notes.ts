import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

const notesTable = pgTable('notes', {
  id: serial().primaryKey(),
  name: varchar({ length: 256 }).notNull(),
  note: varchar({ length: 256 }).notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});

export { notesTable };
