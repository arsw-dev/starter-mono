import { Trash2 } from 'lucide-react';

import type { Note } from '@/types/notes';

type NoteTileProps = {
  note: Note;
  onClick: () => void;
  onDeleteClick: () => void;
};

const NoteTile = ({
  note,
  onClick,
  onDeleteClick,
}: NoteTileProps) => {
  return (
    <div
      className="flex h-9 cursor-pointer items-center justify-between gap-2 rounded-sm border border-zinc-400 px-2"
    >
      <span onClick={onClick} className="flex h-full flex-1 items-center">{note.name}</span>
      <button
        onClick={onDeleteClick}
        className="flex size-7 cursor-pointer items-center justify-center rounded-sm bg-red-400"
      >
        <Trash2 className="text-white" size={18} />
      </button>
    </div>
  );
};

export default NoteTile;
