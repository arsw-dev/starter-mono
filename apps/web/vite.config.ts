/* eslint-disable node/no-process-env */
import type { UserConfig } from 'vite';

import { resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

const ENV_PREFIX = ['WEB_', 'NODE_'];

// https://vite.dev/config/
export default ({ mode }: UserConfig) => {
  process.env = { ...process.env, ...loadEnv(mode ?? '', process.cwd(), ENV_PREFIX) };

  return defineConfig({
    envPrefix: ENV_PREFIX,
    server: {
      port: Number(process.env.WEB_PORT ?? 5173),
      proxy: {
        '/api': {
          target: 'http://localhost:4000',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
    plugins: [
      tailwindcss(),
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
      }),
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler']],
        },
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
  });
};
