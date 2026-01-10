import type { AppRouteHandler } from '@/types/route-handler';

import { getDB } from '@/db';

import type { GetNotes } from './routes';

const getNotesHandler: AppRouteHandler<GetNotes> = async (c) => {
  const db = getDB();
  const notes = await db.query.notesTable.findMany();

  return c.json(notes);
};

export { getNotesHandler };
