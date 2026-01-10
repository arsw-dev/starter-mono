import { createRouter } from '@/http/create';

import * as handlers from './handlers';
import * as routes from './routes';

const notesRouter = createRouter()
  .openapi(routes.getNotes, handlers.getNotesHandler)
  .openapi(routes.getOneNote, handlers.getOneNoteHandler)
  .openapi(routes.createNote, handlers.createNoteHandler)
  .openapi(routes.updateNote, handlers.updateNoteHandler);

export { notesRouter };
