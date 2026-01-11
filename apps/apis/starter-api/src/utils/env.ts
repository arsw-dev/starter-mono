/**
 * @file env.ts
 * @description Setup & validate environment variables
 */

import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { z } from 'zod';

// Setup dotenv support in local environment
// eslint-disable-next-line node/no-process-env
if (!process.env.DOCKER) {
  expand(config({ quiet: true }));
}

const environmentSchema = z.object({
  NODE_ENV: z.string().min(1),
  SERVER_PORT: z.coerce.number(),

  // db
  DATABASE_URL: z.url(),
});

// eslint-disable-next-line node/no-process-env
const parsedResult = environmentSchema.safeParse(process.env);

if (!parsedResult.success) {
  const errorTree = z.treeifyError(parsedResult.error);

  Object.entries(errorTree?.properties ?? {}).forEach(
    ([value, { errors }]) =>
      console.error(`${value}:`, errors.join('\n')),
  );

  process.exit(1);
}

type Environment = z.infer<typeof environmentSchema>;

const env: Environment = parsedResult.data;

export default env;
