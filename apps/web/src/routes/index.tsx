import { createFileRoute } from '@tanstack/react-router';

import { NotesList } from '@/modules/notes/components';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <NotesList />;
}
