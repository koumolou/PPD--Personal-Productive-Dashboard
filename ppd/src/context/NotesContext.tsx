import { createContext, useState, useEffect } from 'react';
import type { NoteContextType, Note } from '../types';
import type { ReactNode } from 'react';


export const NotesContext = createContext <NoteContextType | null > (null);

const mock_keys = 'ppd_notes';

const mock : Note [] = [
  {
    id: crypto.randomUUID(),
    title: '2026 new year plan',
    content: 'this is a new year plan, I am going to do a lot of things',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  {
    id: crypto.randomUUID(),
    title: '2026 c plan',
    content:
      'Making effective short notes involves a systematic approach. Begin by skimming the material to identify key points and headings. Use abbreviations, symbols, and keywords to condense information.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  {
    id: crypto.randomUUID(),
    title: '2026 c plan',
    content:
      'Making effective short notes involves a systematic approach. Begin by skimming the material to identify key points and headings. Use abbreviations, symbols, and keywords to condense information.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

function loadNotes() : Note[] {
  try {
    const raw = localStorage.getItem(mock_keys);
    if (!raw) return mock;

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return mock;
    return parsed;
  } catch (error) {
    console.error('Failed to load Notes:', error);
    return mock;
  }
}

interface NoteProp {
  children : ReactNode
}


function NotesProvider({ children } : NoteProp) {
  const [notes, setNotes] = useState(() => loadNotes());

  function deleteNote(id : string) : void  {
    setNotes(notes.filter((note) => note.id !== id));
  }

  function updateNote(id : string, title : string, content : string  ) : void  {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, title, content, updatedAt: new Date().toISOString() }
          : note,
      ),
    );
  }

  function addNote(title : string,  content : string) : void  {
    const now = new Date().toISOString();

    const newNote = {
      id: crypto.randomUUID(),
      title,
      content,
      createdAt: now,
      updatedAt: now,
    };

    setNotes((prev) => [...prev, newNote]);
  }

  useEffect(() => {
    localStorage.setItem(mock_keys, JSON.stringify(notes));
  }, [notes]);

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote,  }}>
      {children}
    </NotesContext.Provider>
  );
}

export default NotesProvider;
