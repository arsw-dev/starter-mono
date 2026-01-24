import type { Note } from '@/types/notes';

const NoteTile = ({ note }: { note: Note }) => {
  return (
    <div role="button" className="flex h-9 cursor-pointer items-center rounded-sm border border-zinc-400 px-2">
      <span>{note.name}</span>
    </div>
  );
};

export default NoteTile;
