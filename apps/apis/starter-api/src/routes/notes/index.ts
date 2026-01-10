import { createRouter } from '@/http/create';

import * as handlers from './handlers';
import * as routes from './routes';

const notesRouter = createRouter().openapi(routes.getNotes, handlers.getNotesHandler);

export { notesRouter };
