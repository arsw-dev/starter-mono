import type { z } from 'zod';

type ZodSchema = z.ZodUnion | z.ZodObject | z.ZodArray<z.ZodObject>;

export type { ZodSchema };
