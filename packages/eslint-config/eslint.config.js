import { createConfig } from './create-config.js';

const baseConfig = createConfig();

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

export default baseConfig;
export { createConfig, noFuncRule };
