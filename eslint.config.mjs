import { createConfig } from '@starter-mono/eslint-config';

export default createConfig({
  ignores: [
    '**/dist/**',
    '**/migrations/**',
    '**/.drizzle/**',
    '**/node_modules/**',
    '**/.rollup.cache/**',
  ],
});
