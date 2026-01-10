import { defineConfig } from 'drizzle-kit';

import env from './src/utils/env.ts';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema',
  out: './src/db/migrations',
  casing: 'snake_case',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
