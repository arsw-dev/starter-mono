import { createRoute } from '@hono/zod-openapi';
import { OK } from '@starter-mono/http/status-codes';
import { z } from 'zod';

import { createRouter } from '@/http/create';
import { jsonContent } from '@/http/openapi';

const indexRoute = createRouter().openapi(
  createRoute({
    tags: ['Index'],
    method: 'get',
    path: '/',
    responses: {
      [OK]: jsonContent(
        z.object({
          message: z.string(),
        }).openapi({ example: 'Hello World!' }),
        'Index Route',
      ),
    },
  }),
  (c) => {
    return c.json({ message: 'Hello World!' }, 200);
  },
);

export { indexRoute };
