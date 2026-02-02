/**
 * @file main.ts
 * @description Entry point for nodejs hono openAPI server
 */

/* eslint-disable perfectionist/sort-imports */
import env from '@/utils/env';

import { serve } from '@hono/node-server';

import app from '@/app';

import { connectToDB } from '@/db';

const startServer = async () => {
  await connectToDB();

  serve({
    fetch: app.fetch,
    port: env.SERVER_PORT,
  }, (info) => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on http://localhost:${info.port}`);
  });
};

startServer();
