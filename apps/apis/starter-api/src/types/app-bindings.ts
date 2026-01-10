/**
 * @file app-bindings.ts
 * @description Types for App Bindings for Hono API
 */

import type { PinoLogger } from 'hono-pino';

import type { Database } from './database';

type AppBindings = {
  Variables: {
    logger: PinoLogger;
    db: Database;
  };
};

export type { AppBindings };
