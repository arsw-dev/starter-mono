import { OK } from '@starter-mono/http/status-codes';

import type { AppRouteHandler } from '@/types/route-handler';

import { getDB } from '@/db';
import { notesTable } from '@/db/schema';

import type { CreateNote, GetNotes } from './routes';

const getNotesHandler: AppRouteHandler<GetNotes> = async (c) => {
  const db = getDB();
  const notes = await db.query.notesTable.findMany();

  return c.json(notes);
};

const createNoteHandler: AppRouteHandler<CreateNote> = async (c) => {
  const note = c.req.valid('json');

  const db = getDB();

  const [createdTask] = await db.insert(notesTable).values(note).returning();

  return c.json(createdTask, OK);
};

export { createNoteHandler, getNotesHandler };
