import type { RouteConfig, RouteHandler } from '@hono/zod-openapi';

import type { AppBindings } from './app-bindings';

type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>;

export type { AppRouteHandler };
