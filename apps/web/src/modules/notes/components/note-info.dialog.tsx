import type { Note } from '@starter-mono/types';

import { Edit3 } from 'lucide-react';
import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type NoteInfoDialogProps = {
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
}: NoteInfoDialogProps) => {
  const [isEditing, setIsEditing] = useState(false);

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
              <DialogTitle asChild>
                <div className="flex items-center justify-between">
                  <span>
                    {note.title}
                  </span>
                  {isEditing
                    ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => setIsEditing(false)}
                            className="flex h-8 cursor-pointer items-center justify-center rounded-sm bg-blue-400 px-3 py-1 font-normal text-white"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => setIsEditing(false)}
                            className="flex h-8 cursor-pointer items-center justify-center rounded-sm bg-blue-400 px-3 py-1 font-normal text-white"
                          >
                            Save
                          </button>
                        </div>
                      )
                    : (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="flex size-8 cursor-pointer items-center justify-center rounded-sm bg-blue-400 p-2"
                        >
                          <Edit3 className="text-white" />
                        </button>
                      )}
                </div>
              </DialogTitle>
              <DialogDescription
                className="sr-only"
              >
                Note details like name and the note itself
              </DialogDescription>
            </DialogHeader>
            <div>{note.note}</div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NoteInfoDialog;
