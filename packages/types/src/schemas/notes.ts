enum NoteType {
  general = 'general',
  shopping = 'shopping',
  work = 'work',
}

type Note = {
  id: number;
  title: string;
  note: string;
  subtitle: string | null;
  priority: number | null;
  archived: boolean;
  noteType: NoteType;
  createdAt: Date;
  updatedAt: Date;
};

export type { Note };
export { NoteType };
