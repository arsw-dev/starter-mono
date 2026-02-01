/**
 * @file openapi.ts
 * @description Types for OpenAPIHono App
 */

import type { OpenAPIHono } from '@hono/zod-openapi';

import type { AppBindings } from './app-bindings';

type AppOpenAPI = OpenAPIHono<AppBindings>;

export type { AppOpenAPI };
