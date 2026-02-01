/**
 * @file errors.ts
 * @description Error handlers for Hono API
 */

import type { Hook } from '@hono/zod-openapi';
import type { ErrorHandler, NotFoundHandler } from 'hono';
import type { ContentfulStatusCode } from 'hono/utils/http-status';
import type { ZodArray, ZodType } from 'zod';

import { NOT_FOUND as NOT_FOUND_MESSAGE } from '@starter-mono/http/phrases';
import { INTERNAL_SERVER_ERROR, NOT_FOUND, OK, UNPROCESSABLE_ENTITY } from '@starter-mono/http/status-codes';
import { z } from 'zod';

import env from '@/utils/env';

const validationErrorHandler: Hook<any, any, any, any> = (result, c) => {
  if (!result.success) {
    return c.json(
      {
        success: result.success,
        error: result.error.issues,
      },
      UNPROCESSABLE_ENTITY,
    );
  }
};

const notFoundHandler: NotFoundHandler = (c) => {
  return c.json({ message: `${NOT_FOUND_MESSAGE} - ${c.req.path}` }, NOT_FOUND);
};

const onErrorHandler: ErrorHandler = (err, c) => {
  const currentStatus = 'status' in err
    ? err.status
    : c.newResponse(null).status;
  const statusCode = currentStatus !== OK
    ? (currentStatus as ContentfulStatusCode)
    : INTERNAL_SERVER_ERROR;

  const environment = env.NODE_ENV;
  return c.json(
    {
      message: err.message,

      stack: environment === 'production'
        ? undefined
        : err.stack,
    },
    statusCode,
  );
};

const createErrorSchema = <T extends ZodType | ZodArray>(schema: T) => {
  const { error } = schema.safeParse(
    schema.def.type === 'array'
      ? [(schema as ZodArray<any>).element.def.type === 'string' ? 1 : 'invalid']
      : {},
  );

  const example = error
    ? {
        name: error.name,
        issues: error.issues.map((issue: z.core.$ZodIssue) => ({
          code: issue.code,
          path: issue.path,
          message: issue.message,
        })),
      }
    : {
        name: 'ZodError',
        issues: [
          {
            code: 'invalid_type',
            path: ['fieldName'],
            message: 'Expected string, received undefined',
          },
        ],
      };

  return z.object({
    success: z.boolean().openapi({
      example: false,
    }),
    error: z
      .object({
        issues: z.array(
          z.object({
            code: z.string(),
            path: z.array(z.union([z.string(), z.number()])),
            message: z.string().optional(),
          }),
        ),
        name: z.string(),
      })
      .openapi({
        example,
      }),
  });
};

export {
  createErrorSchema,
  notFoundHandler,
  onErrorHandler,
  validationErrorHandler,
};
