import { z } from 'zod';

import { zString } from '@/utils/zod';

const createNoteSchema = z.object({
  title: zString({
    type: 'required',
    max: 256,
    fieldName: 'Title',
  }),
  note: zString({
    type: 'required',
    fieldName: 'Note',
  }),
});

type CreateNote = z.infer<typeof createNoteSchema>;

export { createNoteSchema };
export type { CreateNote };
