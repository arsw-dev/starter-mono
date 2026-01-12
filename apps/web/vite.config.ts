import type { UserConfig } from 'vite';

import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite';

const ENV_PREFIX = ['WEB_', 'NODE_'];

// https://vite.dev/config/
export default ({ mode }: UserConfig) => {
  // eslint-disable-next-line node/no-process-env
  process.env = { ...process.env, ...loadEnv(mode ?? '', process.cwd(), ENV_PREFIX) };

  return defineConfig({
    envPrefix: ENV_PREFIX,
    server: {
      // eslint-disable-next-line node/no-process-env
      port: Number(process.env.WEB_PORT ?? 5173),
    },
    plugins: [
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
