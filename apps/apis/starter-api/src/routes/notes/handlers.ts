import type { AppRouteHandler } from '@/types/route-handler';

import type { GetNotes } from './routes';

const getNotesHandler: AppRouteHandler<GetNotes> = (c) => {
  return c.json(
    [
      {
        note: 'Hello World',
      },
    ],
  );
};

export { getNotesHandler };
