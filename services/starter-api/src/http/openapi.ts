import type { ZodType } from 'zod';

import type { ZodSchema } from '@/types/zod-schema';

import {
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

const jsonContent = <T extends ZodType>(
  schema: T,
  description: string,
) => ({
  content: {
    'application/json': {
      schema,
    },
  },
  description,
}
);

const oneOf = <
  T extends ZodSchema,
>(schemas: T[]) => {
  const registry = new OpenAPIRegistry();

  schemas.forEach((schema, index) => {
    registry.register(index.toString(), schema);
  });

  const generator = new OpenApiGeneratorV3(registry.definitions);
  const components = generator.generateComponents();

  return components.components?.schemas ? Object.values(components.components!.schemas!) : [];
};

const jsonContentOneOf = <
  T extends ZodSchema,
>(schemas: T[],
  description: string,
) => {
  return {
    content: {
      'application/json': {
        schema: {
          oneOf: oneOf(schemas),
        },
      },
    },
    description,
  };
};

const withExample = <T extends z.ZodObject<any>>(schema: T, example: z.infer<T>) => {
  const { shape } = schema;

  const newShape = Object.fromEntries(
    Object.entries(shape).map(([key, field]) => {
      const value = example[key as keyof typeof example];
      return value !== undefined
        ? [key, (field as z.ZodAny).openapi({ example: value })]
        : [key, field];
    }),
  );

  return z.object(newShape) as T;
};

export { jsonContent, jsonContentOneOf, withExample };
