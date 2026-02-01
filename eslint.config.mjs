import antfuConfig from '@antfu/eslint-config';
import pluginQuery from '@tanstack/eslint-plugin-query';
import drizzle from 'eslint-plugin-drizzle';
import { defineConfig } from 'eslint/config';

const createConfig = (options, ...userConfigs) => {
  return antfuConfig(
    {
      type: 'app',
      typescript: true,
      formatters: true,
      stylistic: {
        indent: 2,
        semi: true,
        quotes: 'single',
      },
      ...options,
    },
    {
      rules: {
        'ts/consistent-type-definitions': ['error', 'type'],
        'no-console': ['warn'],
        'antfu/no-top-level-await': ['off'],
        'antfu/top-level-function': ['off'],
        'node/prefer-global/process': ['off'],
        'node/no-process-env': ['error'],
        'perfectionist/sort-imports': [
          'error',
        ],
        'unicorn/filename-case': [
          'error',
          {
            case: 'kebabCase',
            ignore: ['README.md', 'LICENSE'],
          },
        ],
      },
    },
    ...userConfigs,
  );
};

const noFuncRule = {
  'no-restricted-syntax': ['error', {
    selector: 'ExportNamedDeclaration > VariableDeclaration',
    message: 'Do not export variables directly. Use `export { name }` instead.',
  }, {
    selector: 'ExportNamedDeclaration > FunctionDeclaration',
    message: 'Do not export functions directly. Use `export { name }` instead.',
  }, {
    selector: 'ExportDefaultDeclaration > FunctionDeclaration',
    message: 'Do not export default functions directly. Declare first, then export.',
  }],
  'func-style': ['error'],
};

const baseConfig = await createConfig({
  // Global Ignores
  ignores: [
    '**/dist/**',
    '**/migrations/**',
    '**/.drizzle/**',
    '**/node_modules/**',
    '**/.rollup.cache/**',
    '**/public/**',
    '**/routeTree.gen.ts',
  ],
});

const reactConfig = await createConfig({
  react: true,
  plugins: {
    '@tanstack/query': pluginQuery,
  },
}, {
  files: ['apps/**/*'],
  rules: {
    'func-style': ['off'],
    'react/no-array-index-key': ['off'],
    'no-restricted-syntax': ['off'],
    'antfu/top-level-function': 'off',
    '@tanstack/query/exhaustive-deps': 'error',
    'unicorn/filename-case': ['error', {
      case: 'kebabCase',
      ignore: ['README.md', '~__root.tsx'],
    }],
  },
});

const honoConfig = await createConfig({
  plugins: {
    drizzle,
  },
}, {
  files: ['services/**/*'],
  rules: {
    ...noFuncRule,
    ...drizzle.configs.recommended.rules,
  },
});

const packageConfig = await createConfig(undefined, {
  files: ['packages/**/*'],
  rules: {
    ...noFuncRule,
  },
});

export default defineConfig([
  baseConfig,
  reactConfig,
  honoConfig,
  packageConfig,
]);
