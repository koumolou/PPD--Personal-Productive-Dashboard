import NoteItem from './NoteItems';
import type { Note } from '../types';

interface NoteListType {
  notes: Note[];
  deleteNote: (id: Note["id"]) => void;
  className?: string;
}

function NoteList({ notes, deleteNote, className }: NoteListType) {
  return (
    <div className={className}>
      {notes && notes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              callbacks={{ onDelete: deleteNote }}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-2xl mb-3">
            📝
          </div>
          <p className="text-slate-400 text-sm font-medium">No notes yet</p>
          <p className="text-slate-600 text-xs mt-1">Create your first note to get started</p>
        </div>
      )}
    </div>
  );
}

export default NoteList;