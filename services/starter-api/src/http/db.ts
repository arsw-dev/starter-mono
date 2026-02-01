import type { MiddlewareHandler } from 'hono';

import { getDB } from '@/db';

const database = (): MiddlewareHandler => {
  return async (c, next) => {
    c.set('db', getDB());
    return next();
  };
};

export { database };
