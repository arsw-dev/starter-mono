import { NOT_FOUND as NOT_FOUND_MESSAGE } from '@starter-mono/http/phrases';
import { NOT_FOUND, OK } from '@starter-mono/http/status-codes';
import { eq } from 'drizzle-orm';

import type { AppRouteHandler } from '@/types/route-handler';

import { getDB } from '@/db';
import { notesTable } from '@/db/schema';

import type { CreateNote, GetNotes, GetOneNote, UpdateNote } from './routes';

const getNotesHandler: AppRouteHandler<GetNotes> = async (c) => {
  const db = getDB();
  const notes = await db.query.notesTable.findMany();

  return c.json(notes);
};

const getOneNoteHandler: AppRouteHandler<GetOneNote> = async (c) => {
  const { id } = c.req.valid('param');
  const db = getDB();

  const note = await db.query.notesTable.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, id);
    },
  });

  if (!note) {
    return c.json({
      message: NOT_FOUND_MESSAGE,
    }, NOT_FOUND);
  }

  return c.json(note, OK);
};

const createNoteHandler: AppRouteHandler<CreateNote> = async (c) => {
  const note = c.req.valid('json');

  const db = getDB();

  const [createdTask] = await db.insert(notesTable).values(note).returning();

  return c.json(createdTask, OK);
};

const updateNoteHandler: AppRouteHandler<UpdateNote> = async (c) => {
  const { id } = c.req.valid('param');
  const updates = c.req.valid('json');

  const db = getDB();

  const [updatedNote] = await db
    .update(notesTable)
    .set(updates)
    .where(eq(notesTable.id, id))
    .returning();

  if (!updatedNote) {
    return c.json({
      message: NOT_FOUND_MESSAGE,
    }, NOT_FOUND);
  }

  return c.json(updatedNote, OK);
};

export {
  createNoteHandler,
  getNotesHandler,
  getOneNoteHandler,
  updateNoteHandler,
};
