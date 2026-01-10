import { createRoute } from '@hono/zod-openapi';
import { OK } from '@starter-mono/http/status-codes';
import { z } from 'zod';

import { createRouter } from '@/http/create';

const indexRoute = createRouter().openapi(
  createRoute({
    method: 'get',
    path: '/',
    responses: {
      [OK]: {
        content: {
          'application/json': {
            schema: z.object({
              message: z.string(),
            }),
          },
        },
        description: 'Starter API Index',
      },
    },
  }),
  (c) => {
    return c.json({ message: 'Hello World!' }, 200);
  },
);

export { indexRoute };
