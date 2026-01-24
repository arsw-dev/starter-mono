import type { ReactNode } from 'react';

import { useMemo, useState } from 'react';

import { cn } from '@/utils/cn';

import { useAllNotesQuery } from '../queries';
import CreateNote from './create-note.dialog';
import NoteSkeleton from './note-skeleton';

const NotesWrapper = ({ children, className }: { children?: ReactNode; className?: string }) => {
  return (
    <div className={cn('flex flex-col p-2 mx-6 mb-6 flex-1 rounded-sm border', className)}>
      {children}
    </div>
  );
};

const NotesSkeletons = () => {
  const skeletonIds = useMemo(() => Array.from({ length: 5 }).map(() => crypto.randomUUID()), []);

  return skeletonIds.map(id => <NoteSkeleton key={id} />);
};

const NotesList = () => {
  const { data, isLoading } = useAllNotesQuery();
  const [open, setOpen] = useState(false);

  if (isLoading) {
    return (
      <NotesWrapper className="items-center gap-4">
        <NotesSkeletons />
      </NotesWrapper>
    );
  }

  if (!data?.length) {
    return (
      <NotesWrapper className="items-center justify-center gap-2">
        <span>
          You haven't made any notes
        </span>
        <button
          className="cursor-pointer rounded-sm bg-blue-400 px-3 py-1 text-white"
          onClick={() => setOpen(true)}
        >
          Create Note
        </button>
        <CreateNote
          open={open}
          onOpenChange={setOpen}
        />
      </NotesWrapper>
    );
  }

  return (
    <NotesWrapper>

    </NotesWrapper>
  );
};

export { NotesList };
