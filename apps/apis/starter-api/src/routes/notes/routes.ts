import { createRoute } from '@hono/zod-openapi';
import { OK } from '@starter-mono/http/status-codes';
import { z } from 'zod';

import { insertNotesSchema, selectNotesSchema } from '@/db/schema';
import { jsonContent } from '@/http/openapi';

const tags = ['Notes'];

const getNotes = createRoute({
  path: '/notes',
  method: 'get',
  tags,
  responses: {
    [OK]: jsonContent(
      z.array(selectNotesSchema),
      'Retrieves a list of all notes',
    ),
  },
});

type GetNotes = typeof getNotes;

const createNote = createRoute({
  path: '/notes',
  method: 'post',
  tags,
  request: {
    body: { ...jsonContent(insertNotesSchema, 'The note to be created'), required: true },
  },
  responses: {
    [OK]: jsonContent(selectNotesSchema, 'Returns the created note'),
  },
});

type CreateNote = typeof createNote;

export { createNote, getNotes };
export type { CreateNote, GetNotes };
