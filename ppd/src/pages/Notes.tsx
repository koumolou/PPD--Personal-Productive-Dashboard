import Notelist from '../component/NoteLists';
import AddNoteForm from '../component/AddNoteForm';
import { useContext } from 'react';
import { NotesContext } from '../context/NotesContext';
import type { Note} from '../types';

function Notes() {
  // Consume context with proper typing
  const contextnote = useContext(NotesContext);
  if (!contextnote) throw new Error('NotesContext must be used within its Provider');

  const { notes, deleteNote, addNote } = contextnote;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">My Notes</h1>
        {/* Pass typed addNote function */}
        <AddNoteForm />
      </div>

      <Notelist
        notes={notes}
        deleteNote={deleteNote}
        className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      />
    </div>
  );
}

export default Notes;