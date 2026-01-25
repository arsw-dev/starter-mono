import { NOT_FOUND as NOT_FOUND_MESSAGE } from '@starter-mono/http/phrases';
import { CREATED, NO_CONTENT, NOT_FOUND, OK } from '@starter-mono/http/status-codes';
import { eq } from 'drizzle-orm';

import type { AppRouteHandler } from '@/types/route-handler';

import { getDB } from '@/db';
import { notesTable } from '@/db/schemas';

import type { CreateNote, DeleteNote, GetNotes, GetOneNote, UpdateNote } from './routes';

const getNotesHandler: AppRouteHandler<GetNotes> = async (c) => {
  const db = getDB();
  const notes = await db.select().from(notesTable).orderBy(notesTable.createdAt, notesTable.id);

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

  return c.json(createdTask, CREATED);
};

const updateNoteHandler: AppRouteHandler<UpdateNote> = async (c) => {
  const { id } = c.req.valid('param');
  const updates = c.req.valid('json');

  const db = getDB();

  const [updatedNote] = await db
    .update(notesTable)
    .set({
      ...updates,
      updatedAt: new Date(),
    })
    .where(eq(notesTable.id, id))
    .returning();

  if (!updatedNote) {
    return c.json({
      message: NOT_FOUND_MESSAGE,
    }, NOT_FOUND);
  }

  return c.json(updatedNote, OK);
};

const deleteNoteHandler: AppRouteHandler<DeleteNote> = async (c) => {
  const { id } = c.req.valid('param');
  const db = getDB();

  const [deletedNote] = await db
    .delete(notesTable)
    .where(eq(notesTable.id, id))
    .returning();

  if (!deletedNote) {
    return c.json({ message: NOT_FOUND_MESSAGE }, NOT_FOUND);
  }

  return c.body(null, NO_CONTENT);
};

export {
  createNoteHandler,
  deleteNoteHandler,
  getNotesHandler,
  getOneNoteHandler,
  updateNoteHandler,
};
