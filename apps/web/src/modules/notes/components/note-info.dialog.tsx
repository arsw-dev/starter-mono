import type { Note } from '@/types/notes';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type NoteInfoProps = {
  note: Note | undefined;
  open: boolean;
  onOpenChange: (next: boolean) => void;
  onCloseComplete: () => void;
};

const NoteInfoDialog = ({
  note,
  open,
  onOpenChange,
  onCloseComplete,
}: NoteInfoProps) => {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        showCloseButton={false}
        onAnimationEnd={() => {
          if (!open) {
            onCloseComplete();
          }
        }}
      >
        {note && (
          <>
            <DialogHeader>
              <DialogTitle>{note.name}</DialogTitle>
              <DialogDescription className="sr-only">Note details like name and the note itself</DialogDescription>
            </DialogHeader>
            <div>{note.note}</div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NoteInfoDialog;
