import { createRoute } from '@hono/zod-openapi';
import { OK } from '@starter-mono/http/status-codes';
import { z } from 'zod';

import { jsonContent } from '@/http/openapi';

const tags = ['Notes'];

const getNotes = createRoute({
  path: '/notes',
  method: 'get',
  tags,
  responses: {
    [OK]: jsonContent(
      z.array(
        z.object({
          note: z.string(),
        }),
      ),
      'Retrieves a list of all notes',
    ),
  },
});

type GetNotes = typeof getNotes;

export { getNotes };
export type { GetNotes };
