import { z } from '@hono/zod-openapi';

const createMessageObjectSchema = (exampleMessage: string = 'Hello World') => {
  return z.object({
    message: z.string(),
  }).openapi({
    example: {
      message: exampleMessage,
    },
  });
};

const idParamsSchema = z.object({
  id: z.coerce.number().openapi({
    param: {
      name: 'id',
      in: 'path',
      required: true,
    },
    required: ['id'],
    example: 17,
  }),
});

export { createMessageObjectSchema, idParamsSchema };
