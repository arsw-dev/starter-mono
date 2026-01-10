/**
 * @file create-app.ts
 * @description Creates Hono app with middleware & handlers (errors & docs)
 */

import { OpenAPIHono } from '@hono/zod-openapi';
import { Scalar } from '@scalar/hono-api-reference';
import { requestId } from 'hono/request-id';

import type { AppBindings } from '@/types/app-bindings';

import { database } from './db';
import { notFoundHandler, onErrorHandler, validationErrorHandler } from './errors';
import emojiFavicon from './favicon';
import logger from './logger';

type CreateAppOptions = {
  version: string;
  title: string;
};

const createRouter = () => (new OpenAPIHono<AppBindings>({
  strict: false,
  defaultHook: validationErrorHandler,
}));

const createApp = ({ title, version }: CreateAppOptions) => {
  const app = createRouter();

  // Middleware
  // Core
  app.use(requestId());
  app.use(logger());
  app.use(database());

  // UX
  app.use(emojiFavicon('🔥'));

  // Error handlers
  app.notFound(notFoundHandler);
  app.onError(onErrorHandler);

  app.doc('/openapi', {
    openapi: '3.1.0',
    info: {
      title,
      version,
    },
  });

  app.get('/docs', Scalar({ url: '/openapi', theme: 'kepler', defaultHttpClient: { targetKey: 'js', clientKey: 'fetch' } }));

  return app;
};

export { createApp, createRouter };
