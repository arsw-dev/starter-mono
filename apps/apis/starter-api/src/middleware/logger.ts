import { pinoLogger } from 'hono-pino';
import pino from 'pino';
import pretty from 'pino-pretty';

const logger = () => pinoLogger(
  {
    // eslint-disable-next-line node/no-process-env
    pino: pino(process.env.NODE_ENV === 'dev' ? pretty() : undefined),
  },
);

export default logger;
