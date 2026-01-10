/**
 * @file errors.ts
 * @description Error handlers for Hono API
 */

import type { ErrorHandler, NotFoundHandler } from 'hono';
import type { ContentfulStatusCode } from 'hono/utils/http-status';

import { NOT_FOUND as NOT_FOUND_MESSAGE } from '@starter-mono/http/phrases';
import { INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from '@starter-mono/http/status-codes';

import env from '@/utils/env';

const notFoundHandler: NotFoundHandler = (c) => {
  return c.json({ message: `${NOT_FOUND_MESSAGE} - ${c.req.path}` }, NOT_FOUND);
};

const onErrorHandler: ErrorHandler = (err, c) => {
  const currentStatus = 'status' in err
    ? err.status
    : c.newResponse(null).status;
  const statusCode = currentStatus !== OK
    ? (currentStatus as ContentfulStatusCode)
    : INTERNAL_SERVER_ERROR;

  const environment = env.NODE_ENV;
  return c.json(
    {
      message: err.message,

      stack: environment === 'production'
        ? undefined
        : err.stack,
    },
    statusCode,
  );
};

export {
  notFoundHandler,
  onErrorHandler,
};
