import type { Note } from "../types";

interface NotelistItemType {
  note: Note;
  callbacks: {
    onDelete: (id: Note["id"]) => void;
  };
}

function NoteItem({ note, callbacks }: NotelistItemType) {
  const { onDelete } = callbacks;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-3 hover:border-slate-700 transition">
      
      {/* Title */}
      <h3 className="text-white font-semibold text-base leading-snug">
        {note.title}
      </h3>

      {/* Content */}
      <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
        {note.content}
      </p>

      {/* Footer */}
      <div className="flex justify-between items-center pt-2 border-t border-slate-800">
        <span className="text-xs text-slate-600">
          Updated {new Date(note.updatedAt).toLocaleDateString()}
        </span>
        <button
          type="button"
          onClick={() => onDelete(note.id)}
          className="text-xs text-slate-500 hover:text-red-400 hover:bg-red-500/10 px-2 py-1 rounded-lg transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default NoteItem;