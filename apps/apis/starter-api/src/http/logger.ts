import { pinoLogger } from 'hono-pino';
import pino from 'pino';
import pretty from 'pino-pretty';

import env from '@/utils/env';

const logger = () => pinoLogger(
  {
    pino: pino(env.NODE_ENV === 'dev' ? pretty() : undefined),
  },
);

export default logger;
