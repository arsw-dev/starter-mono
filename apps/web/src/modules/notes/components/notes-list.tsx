import type { Note } from '@starter-mono/types';
import type { ReactNode } from 'react';

import { Plus } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/utils/cn';

import { useAllNotesQuery } from '../queries';
import CreateNoteDialog from './create-note.dialog';
import DeleteNoteDialog from './delete-note.dialog';
import NoteInfoDialog from './note-info.dialog';
import NoteSkeleton from './note-skeleton';
import NoteTile from './note-tile';

const NotesWrapper = ({ children, className }: { children?: ReactNode; className?: string }) => {
  return (
    <div className={cn('relative flex flex-col p-2 mx-6 mb-6 flex-1 rounded-sm border', className)}>
      {children}
    </div>
  );
};

const NotesList = () => {
  const { data: notes, isLoading } = useAllNotesQuery();

  const [noteDialogOpen, setNoteDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [activeNote, setActiveNote] = useState<Note | undefined>(undefined);

  const openNoteDialog = (note: Note) => {
    setActiveNote(note);
    setNoteDialogOpen(true);
  };

  const openDeleteNoteDialog = (note: Note) => {
    setActiveNote(note);
    setDeleteDialogOpen(true);
  };

  const noNotes = notes?.length === 0;

  return (
    <>
      <NotesWrapper className={cn(
        isLoading
          ? 'gap-4'
          : noNotes ? 'items-center justify-center gap-2' : 'gap-4',
      )}
      >
        {isLoading
          ? (
              <>
                {Array.from({ length: 5 })
                  .map((_, idx) => <NoteSkeleton key={idx} />)}
                <div className="absolute right-4 bottom-4 size-8 animate-pulse rounded-sm bg-zinc-400" />
              </>
            )
          : noNotes
            ? (
                <>
                  <span>
                    You haven't made any notes
                  </span>
                  <button
                    className="cursor-pointer rounded-sm bg-blue-400 px-3 py-1 text-white"
                    onClick={() => setCreateDialogOpen(true)}
                  >
                    Create Note
                  </button>
                </>
              )
            : (
                <>
                  {notes?.map(note => (
                    <NoteTile
                      key={note.id}
                      note={note}
                      onClick={() => openNoteDialog(note)}
                      onDeleteClick={() => openDeleteNoteDialog(note)}
                    />
                  ))}
                  <button
                    onClick={() => setCreateDialogOpen(true)}
                    className="absolute right-4 bottom-4 flex size-8 cursor-pointer items-center justify-center rounded-sm bg-blue-400"
                  >
                    <Plus className="text-white" />
                  </button>
                </>
              )}
      </NotesWrapper>
      <CreateNoteDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
      <NoteInfoDialog
        note={activeNote}
        open={noteDialogOpen}
        onOpenChange={setNoteDialogOpen}
        onCloseComplete={() => setActiveNote(undefined)}
      />
      <DeleteNoteDialog
        note={activeNote}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onCloseComplete={() => setActiveNote(undefined)}
      />
    </>
  );
};

export { NotesList };
