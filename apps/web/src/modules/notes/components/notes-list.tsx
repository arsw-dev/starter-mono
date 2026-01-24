import type { ReactNode } from 'react';

import { Plus } from 'lucide-react';
import { useMemo, useState } from 'react';

import { cn } from '@/utils/cn';

import { useAllNotesQuery } from '../queries';
import CreateNote from './create-note.dialog';
import NoteSkeleton from './note-skeleton';
import NoteTile from './note-tile';

const NotesWrapper = ({ children, className }: { children?: ReactNode; className?: string }) => {
  return (
    <div className={cn('relative flex flex-col p-2 mx-6 mb-6 flex-1 rounded-sm border', className)}>
      {children}
    </div>
  );
};

const NotesSkeletons = () => {
  const skeletonIds = useMemo(() => Array.from({ length: 5 }).map(() => crypto.randomUUID()), []);

  return skeletonIds.map(id => <NoteSkeleton key={id} />);
};

const NotesList = () => {
  const { data: notes, isFetching } = useAllNotesQuery();
  const [open, setOpen] = useState(false);

  if (isFetching) {
    return (
      <NotesWrapper className="gap-4">
        <NotesSkeletons />
        <div className="absolute right-4 bottom-4 size-8 animate-pulse rounded-sm bg-zinc-400" />
      </NotesWrapper>
    );
  }

  if (!notes?.length) {
    return (
      <>
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
        </NotesWrapper>
        <CreateNote
          open={open}
          onOpenChange={setOpen}
        />
      </>
    );
  }

  return (
    <>
      <NotesWrapper className="gap-4">
        {notes.map(note => <NoteTile key={note.id} note={note} />)}
        <button
          className="absolute right-4 bottom-4 flex size-8 cursor-pointer items-center justify-center rounded-sm bg-blue-400"
          onClick={() => setOpen(true)}
        >
          <Plus className="text-white" />
        </button>
      </NotesWrapper>
      <CreateNote
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
};

export { NotesList };
