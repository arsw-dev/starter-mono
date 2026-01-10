import { OpenAPIHono } from '@hono/zod-openapi';
import { requestId } from 'hono/request-id';

import type { AppBindings } from '@/types/app-bindings';

import { notFoundHandler, onErrorHandler } from './errors';
import emojiFavicon from './favicon';
import logger from './logger';

const createApp = () => {
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

  return app;
};

export { createApp };
