import { createRoute } from '@hono/zod-openapi';
import { NOT_FOUND as NOT_FOUND_MESSAGE } from '@starter-mono/http/phrases';
import {
  CREATED,
  NO_CONTENT,
  NOT_FOUND,
  OK,
  UNPROCESSABLE_ENTITY,
} from '@starter-mono/http/status-codes';
import { z } from 'zod';

import { insertNotesSchema, patchNoteSchema, selectNotesSchema } from '@/db/schema';
import { createErrorSchema } from '@/http/errors';
import { jsonContent, jsonContentOneOf } from '@/http/openapi';
import { createMessageObjectSchema, idParamsSchema } from '@/http/schemas';

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

const getOneNote = createRoute({
  path: '/notes/{id}',
  method: 'get',
  tags,
  request: {
    params: idParamsSchema,
  },
  responses: {
    [OK]: jsonContent(selectNotesSchema, 'Retrieves note by id'),
    [UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(idParamsSchema),
      'Invalid id',
    ),
    [NOT_FOUND]: jsonContent(
      createMessageObjectSchema(NOT_FOUND_MESSAGE),
      'Requested note not found',
    ),
  },
});

type GetOneNote = typeof getOneNote;

const createNote = createRoute({
  path: '/notes',
  method: 'post',
  tags,
  request: {
    body: { ...jsonContent(
      insertNotesSchema,
      'The note to be created',
    ), required: true },
  },
  responses: {
    [CREATED]: jsonContent(
      selectNotesSchema,
      'Returns the created note',
    ),
    [UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertNotesSchema),
      'Validation error(s)',
    ),
  },
});

type CreateNote = typeof createNote;

const updateNote = createRoute({
  path: '/notes/{id}',
  method: 'patch',
  tags,
  request: {
    params: idParamsSchema,
    body: { ...jsonContent(patchNoteSchema, 'Note updates'), required: true },
  },
  responses: {
    [OK]: jsonContent(
      selectNotesSchema,
      'Updates and returns note',
    ),
    [UNPROCESSABLE_ENTITY]: jsonContentOneOf([
      createErrorSchema(idParamsSchema),
      createErrorSchema(patchNoteSchema),
    ], 'Validation error(s)'),
    [NOT_FOUND]: jsonContent(
      createMessageObjectSchema(NOT_FOUND_MESSAGE),
      'Requested note not found',
    ),
  },
});

type UpdateNote = typeof updateNote;

const deleteNote = createRoute({
  path: '/notes/{id}',
  method: 'delete',
  tags,
  request: {
    params: idParamsSchema,
  },
  responses: {
    [NO_CONTENT]: {
      description: 'Note deleted',
    },
    [NOT_FOUND]: jsonContent(
      createMessageObjectSchema(NOT_FOUND_MESSAGE),
      'Requested note not found',
    ),
    [UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(idParamsSchema), 'Invalid id'),
  },
});

type DeleteNote = typeof deleteNote;

export { createNote, deleteNote, getNotes, getOneNote, updateNote };
export type { CreateNote, DeleteNote, GetNotes, GetOneNote, UpdateNote };
