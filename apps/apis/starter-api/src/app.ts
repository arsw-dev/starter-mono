/**
 * @file app.ts
 * @description Initializes server app
 */

import { createApp } from '@/http/create-app';

import pkgJson from '../package.json';

const app = createApp({
  title: 'Starter API',
  version: pkgJson.version,
});

export default app;
