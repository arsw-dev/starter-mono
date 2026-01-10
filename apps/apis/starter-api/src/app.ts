/**
 * @file app.ts
 * @description Initializes server app
 */

import { createApp } from '@/http/create';

import pkgJson from '../package.json';
import { indexRoute } from './routes';
import { notesRouter } from './routes/notes';

const app = createApp({
  title: 'Starter API',
  version: pkgJson.version,
});

const routes = [
  indexRoute,
  notesRouter,
];

routes.forEach((route) => {
  app.route('/', route);
});

export default app;
