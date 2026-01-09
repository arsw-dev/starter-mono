import type { PinoLogger } from 'hono-pino';
import type { ContentfulStatusCode } from 'hono/utils/http-status';

import { OpenAPIHono } from '@hono/zod-openapi';
import { NOT_FOUND as NOT_FOUND_MESSAGE } from '@starter-mono/http/phrases';
import { INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from '@starter-mono/http/status-codes';
import { requestId } from 'hono/request-id';

import logger from './middleware/logger';

type AppBindings = {
  Variables: {
    logger: PinoLogger;
  };
};

const app = new OpenAPIHono<AppBindings>();

app.use(requestId());
app.use(logger());

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.notFound(c => c.json({ message: `${NOT_FOUND_MESSAGE} - ${c.req.path}` }, NOT_FOUND));

app.onError((err, c) => {
  const currentStatus = 'status' in err
    ? err.status
    : c.newResponse(null).status;
  const statusCode = currentStatus !== OK
    ? (currentStatus as ContentfulStatusCode)
    : INTERNAL_SERVER_ERROR;

  // eslint-disable-next-line node/no-process-env
  const env = process.env?.NODE_ENV;
  return c.json(
    {
      message: err.message,

      stack: env === 'production'
        ? undefined
        : err.stack,
    },
    statusCode,
  );
});

export default app;
