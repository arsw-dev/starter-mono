/**
 * @file app-bindings.ts
 * @description Types for App Bindings for Hono API
 */

import type { PinoLogger } from 'hono-pino';

type AppBindings = {
  Variables: {
    logger: PinoLogger;
  };
};

export type { AppBindings };
