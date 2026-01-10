/**
 * @file create-app.ts
 * @description Creates Hono app with middleware & handlers (errors & docs)
 */

import { OpenAPIHono } from '@hono/zod-openapi';
import { requestId } from 'hono/request-id';

import type { AppBindings } from '@/types/app-bindings';

import { notFoundHandler, onErrorHandler } from './errors';
import emojiFavicon from './favicon';
import logger from './logger';

type CreateAppOptions = {
  version: string;
  title: string;
};

const createApp = ({ title, version }: CreateAppOptions) => {
  const app = new OpenAPIHono<AppBindings>({
    strict: false,
  });

  // Middleware
  // Core
  app.use(requestId());
  app.use(logger());

  // UX
  app.use(emojiFavicon('🔥'));

  // Error handlers
  app.notFound(notFoundHandler);
  app.onError(onErrorHandler);

  app.doc('/docs', {
    openapi: '3.1.0',
    info: {
      title,
      version,
    },
  });

  return app;
};

export { createApp };
