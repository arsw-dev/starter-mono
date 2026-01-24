import { z } from 'zod';

const environmentSchema = z.object({
  WEB_PORT: z.coerce.number(),
  WEB_API_BASE_URL: z.string(),
});

const parsedEnvironment = environmentSchema.safeParse(import.meta.env);

if (!parsedEnvironment.success) {
  const errorTree = z.treeifyError(parsedEnvironment.error);

  Object.entries(errorTree?.properties ?? {}).forEach(
    ([value, { errors }]) =>
      console.error(`${value}:`, errors.join('\n')),
  );

  throw new Error('Error parsing environment variables');
}

const env = parsedEnvironment.data;

export { env };
