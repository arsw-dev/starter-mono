import { createConfig } from '@starter-mono/eslint-config';
import drizzle from 'eslint-plugin-drizzle';

export default createConfig({
  ignores: ['src/db/migrations/*', 'public/*', 'dist', '.rollup.cache'],
  plugins: { drizzle },
  rules: {
    ...drizzle.configs.recommended.rules,
  },
});
