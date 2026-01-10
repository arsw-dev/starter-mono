import type { PinoLogger } from 'hono-pino';

type AppBindings = {
  Variables: {
    logger: PinoLogger;
  };
};

export type { AppBindings };
