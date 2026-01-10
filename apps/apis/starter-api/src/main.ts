/* eslint-disable import/no-duplicates */
import '@/utils/env';

import { serve } from '@hono/node-server';

import app from '@/app';
import env from '@/utils/env';

serve({
  fetch: app.fetch,
  port: env.SERVER_PORT,
}, (info) => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${info.port}`);
});
