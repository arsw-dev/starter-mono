import { z } from 'zod';

const createNoteSchema = z.object({
  name: z.string().min(1).max(256),
  note: z.string().min(1),
});

type CreateNote = z.infer<typeof createNoteSchema>;

export { createNoteSchema };
export type { CreateNote };
