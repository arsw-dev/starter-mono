import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import CreateNoteForm from './create-note.form';

const CreateNote = ({
  open,
  onOpenChange,
}: { open: boolean; onOpenChange: (next: boolean) => void }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Create Note</DialogTitle>
          <DialogDescription
            className="sr-only"
          >
            create a note
          </DialogDescription>
        </DialogHeader>
        <CreateNoteForm
          onSuccess={() => onOpenChange(false)}
          onError={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateNote;
