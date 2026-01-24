import { createConfig } from '@starter-mono/eslint-config';
import pluginQuery from '@tanstack/eslint-plugin-query';
import tailwindcss from 'eslint-plugin-tailwindcss';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export default createConfig({
  ignores: ['*/**/routeTree.gen.ts'],
  react: true,
  plugins: {
    '@tanstack/query': pluginQuery,
    tailwindcss,
  },
  settings: {
    tailwindcss: {
      config: `${dirname(fileURLToPath(import.meta.url))}/src/index.css`,
    },
  },
  rules: {
    ...tailwindcss.configs.recommended.rules,
    'func-style': ['off'],
    'no-restricted-syntax': ['off'],
    'antfu/top-level-function': 'off',
    '@tanstack/query/exhaustive-deps': 'error',
    'unicorn/filename-case': ['error', {
      case: 'kebabCase',
      ignore: ['README.md', '~__root.tsx'],
    }],
  },
});
