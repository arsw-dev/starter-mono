/**
 * @file app.ts
 * @description Initializes server app
 */

import { createApp } from '@/http/create';

import pkgJson from '../package.json';
import { indexRoute } from './routes';

const app = createApp({
  title: 'Starter API',
  version: pkgJson.version,
});

const routes = [
  indexRoute,
];

routes.forEach((route) => {
  app.route('/', route);
});

export default app;
