import type { Habit } from "../types";

interface HabitItemProps {
  habit: {
    id: number;
    title: string;
    completed?: boolean;
  };
  callbacks: {
    toggleHabitToday: (id: Habit["id"]) => void;
    onDelete: (id: Habit["id"]) => void;
  };
}

function HabitItem({ habit, callbacks }: HabitItemProps) {
  const { id, title, completed } = habit;
  const { toggleHabitToday, onDelete } = callbacks;

  return (
    <div className={`flex items-center justify-between px-4 py-3 rounded-xl border transition ${
      completed
        ? "bg-teal-500/5 border-teal-500/20"
        : "bg-slate-800 border-slate-700"
    }`}>
      
      {/* Left — Checkbox + Title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => toggleHabitToday(id)}
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition ${
            completed
              ? "bg-teal-500 border-teal-500 text-white"
              : "border-slate-500 hover:border-teal-400"
          }`}
        >
          {completed && (
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        <p className={`text-sm transition ${
          completed ? "line-through text-slate-500" : "text-slate-200"
        }`}>
          {title}
        </p>
      </div>

      {/* Right — Delete */}
      <button
        type="button"
        onClick={() => onDelete(id)}
        className="text-xs text-slate-500 hover:text-red-400 hover:bg-red-500/10 px-2 py-1 rounded-lg transition"
      >
        Delete
      </button>
    </div>
  );
}

export default HabitItem;