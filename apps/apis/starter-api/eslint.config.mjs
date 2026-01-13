import { createConfig } from '@starter-mono/eslint-config';
import drizzle from 'eslint-plugin-drizzle';

export default createConfig({
  ignores: ['src/db/migrations/*', 'public/*', 'dist', '.rollup.cache'],
  plugins: { drizzle },
  rules: {
    ...drizzle.configs.recommended.rules,
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
  },
});
