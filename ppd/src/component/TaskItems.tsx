import type { Task } from "../types";

interface TaskItemProps {
  task: Task;
  callbacks: {
    onToggle: (id: Task["id"]) => void;
    onDelete: (id: Task["id"]) => void;
  };
}

function TaskItem({ task, callbacks }: TaskItemProps) {
  if (!task) return null;

  const { id, title, completed } = task;
  const { onToggle, onDelete } = callbacks;

  return (
    <div className={`flex items-center justify-between px-4 py-3 rounded-xl border transition ${
      completed
        ? "bg-green-500/5 border-green-500/20"
        : "bg-slate-800 border-slate-700"
    }`}>

      {/* Left — Checkbox + Title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onToggle(id)}
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition ${
            completed
              ? "bg-green-500 border-green-500 text-white"
              : "border-slate-500 hover:border-green-400"
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

export default TaskItem;