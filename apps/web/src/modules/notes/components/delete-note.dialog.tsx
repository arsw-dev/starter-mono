import { Loader2 } from 'lucide-react';

import type { Note } from '@/types/notes';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { useDeleteNoteMutation } from '../mutations';

type DeleteNoteDialogProps = {
  note: Note | undefined;
  open: boolean;
  onOpenChange: (next: boolean) => void;
  onCloseComplete: () => void;
};

const DeleteNoteDialog = ({
  note,
  open,
  onOpenChange,
  onCloseComplete,
}: DeleteNoteDialogProps) => {
  const { mutate, isPending } = useDeleteNoteMutation();

  const deleteHandler = () => {
    if (!note) {
      return;
    }

    mutate(note.id, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog
      open={isPending ? true : open}
      onOpenChange={(next) => {
        if (isPending) {
          return;
        }

        onOpenChange(next);
      }}
    >
      <DialogContent
        showCloseButton={false}
        onAnimationEnd={() => {
          if (!open) {
            onCloseComplete();
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this note?</DialogTitle>
          <DialogDescription className="sr-only">
            Dialog to confirm deletion of note
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full justify-end gap-2">
          <button
            onClick={() => onOpenChange(false)}
            className="cursor-pointer rounded-sm border px-3 py-1"
            disabled={isPending}
          >
            Cancel
          </button>
          <button
            onClick={deleteHandler}
            className="flex w-18 cursor-pointer justify-center rounded-sm bg-red-400 px-3 py-1 text-white"
            disabled={isPending}
          >
            {isPending ? <Loader2 className="animate-spin" /> : `Delete`}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteNoteDialog;
