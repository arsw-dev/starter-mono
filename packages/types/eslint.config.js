import { createConfig, noFuncRule } from '@starter-mono/eslint-config';

export default createConfig({
  ignores: ['dist', '.rollup.cache'],
  rules: {
    ...noFuncRule,
  },
});
