import { NoteType } from '@starter-mono/types';
import { sql } from 'drizzle-orm';
import {
  boolean,
  check,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

const noteTypeEnum = pgEnum(
  'note_type',
  Object.values(NoteType) as [NoteType, ...NoteType[]],
);

const notesTable = pgTable(
  'notes',
  {
    id: serial().primaryKey(),

    title: varchar({ length: 256 }).notNull(),
    note: text().notNull(),
    subtitle: varchar({ length: 256 }),

    priority: integer().default(0),

    archived: boolean().notNull().default(false),

    noteType: noteTypeEnum().notNull().default(NoteType.general),

    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
  },
  t => [
    /** required trimmed strings */
    check(
      'title_min_length',
      sql`char_length(btrim(${t.title})) >= 1`,
    ),
    check(
      'note_min_length',
      sql`char_length(btrim(${t.note})) >= 1`,
    ),

    /** nullable but trimmed if present */
    check(
      'subtitle_trimmed_if_present',
      sql`${t.subtitle} IS NULL OR char_length(btrim(${t.subtitle})) >= 1`,
    ),

    /** numeric sanity */
    check(
      'priority_non_negative',
      sql`${t.priority} >= 0`,
    ),
  ],
);

export { notesTable, NoteType, noteTypeEnum };
