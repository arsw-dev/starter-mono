import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { dts } from 'rollup-plugin-dts';

import pkg from './package.json' with { type: 'json' };

// Base JS config
const baseConfig = {
  external: [
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.peerDependencies ?? {}),
  ],
  plugins: [
    resolve(),
    typescript({
      tsconfig: './tsconfig.json',
      outputToFilesystem: false,
      declaration: false,
    }),
    terser(),
  ],
};

// Index JS
const indexConfig = {
  ...baseConfig,
  input: 'src/main.ts',
  output: [
    { file: 'dist/index.cjs', format: 'cjs' },
    { file: 'dist/index.mjs', format: 'esm' },
  ],
};

// Index types
const indexTypes = {
  input: 'src/main.ts',
  output: { file: 'dist/index.d.ts', format: 'es' },
  plugins: [dts()],
};

// Status JS
const statusConfig = {
  ...baseConfig,
  input: 'src/status/index.ts',
  output: [
    { file: 'dist/status/status.cjs', format: 'cjs' },
    { file: 'dist/status/status.mjs', format: 'esm' },
  ],
};

// Status types
const statusTypes = {
  input: 'src/status/index.ts',
  output: { file: 'dist/status/status.d.ts', format: 'es' },
  plugins: [dts()],
};

// Phrases JS
const phrasesConfig = {
  ...baseConfig,
  input: 'src/phrases/index.ts',
  output: [
    { file: 'dist/phrases/phrases.cjs', format: 'cjs' },
    { file: 'dist/phrases/phrases.mjs', format: 'esm' },
  ],
};

// Phrases types
const phrasesTypes = {
  input: 'src/phrases/index.ts',
  output: { file: 'dist/phrases/phrases.d.ts', format: 'es' },
  plugins: [dts()],
};

export default [
  indexConfig,
  indexTypes,
  statusConfig,
  statusTypes,
  phrasesConfig,
  phrasesTypes,
];
