import type { ComponentProps } from 'react';

import type { Note } from '@/types/notes';

const NoteTile = ({ note, ...props }: ComponentProps<'div'> & { note: Note }) => {
  return (
    <div
      role="button"
      className="flex h-9 cursor-pointer items-center rounded-sm border border-zinc-400 px-2"
      {...props}
    >
      <span>{note.name}</span>
    </div>
  );
};

export default NoteTile;
