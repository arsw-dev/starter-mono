import { createConfig } from '@starter-mono/eslint-config';
import pluginQuery from '@tanstack/eslint-plugin-query';

export default createConfig({
  ignores: ['*/**/routeTree.gen.ts'],
  react: true,
  plugins: {
    '@tanstack/query': pluginQuery,
  },
  rules: {
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
