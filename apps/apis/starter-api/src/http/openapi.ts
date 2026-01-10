import type { ZodType } from 'zod';

import {
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from '@asteasolutions/zod-to-openapi';

import type { ZodSchema } from '@/types/zod-schema';

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

export { jsonContent, jsonContentOneOf };
