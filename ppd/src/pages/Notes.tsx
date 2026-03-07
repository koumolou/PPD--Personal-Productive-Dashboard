import Notelist from '../component/NoteLists';
import AddNoteForm from '../component/AddNoteForm';
import { useContext } from 'react';
import { NotesContext } from '../context/NotesContext';

function Notes() {
  const contextnote = useContext(NotesContext);
  if (!contextnote) throw new Error('NotesContext must be used within its Provider');
  const { notes, deleteNote } = contextnote;

  return (
    <div className="max-w-7xl mx-auto space-y-6 py-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-black font-bold text-2xl">My Notes</h1>
          <p className="text-slate-500 text-xs mt-4">{notes.length} note{notes.length !== 1 ? 's' : ''}</p>
        </div>
        <AddNoteForm />
      </div>

      {/* Notes Grid */}
      <Notelist
        notes={notes}
        deleteNote={deleteNote}
      />

    </div>
  );
}

export default Notes;