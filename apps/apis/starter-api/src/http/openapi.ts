import type { ZodType } from 'zod';

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

export { jsonContent };
