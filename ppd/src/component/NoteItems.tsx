import type { Note } from "../types";


interface NotelistItemType {
  note : Note,
  callbacks : {
    onDelete :   (id: Note["id"]) => void;
  }
}

function NoteItem({ note, callbacks } :NotelistItemType) {
  const { onDelete } = callbacks;
  return (
    <div className="border-o rounded p-4 mb-4 shadow text-center bg-slate-900">
      <h3 className="font-semibold text-white text-lg">{note.title }</h3>

      <p className="text-white mt-2">{note.content}</p>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <span>Updated: {new Date(note.updatedAt).toLocaleDateString()}</span>

        <button
          onClick={() => onDelete(note.id)}
          className="text-red-600 hover:underline"
        >
          Delete
        </button>
       
      </div>
    </div>
  );
}

export default NoteItem;
