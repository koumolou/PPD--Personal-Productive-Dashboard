import type { Habit } from "../types";

interface HabitItemProps {
  habit: {
    id : number,
    title : string,
    completed ?: boolean
  }
  callbacks: {
    toggleHabitToday: (id: Habit["id"]) => void;
    onDelete: (id: Habit["id"]) => void;
  };
}

function HabitItem({ habit, callbacks }: HabitItemProps) {
  const { id, title, completed } = habit;
  const { toggleHabitToday, onDelete } = callbacks;

  return (
    <div className="p-4 m-2 bg-white shadow rounded flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => toggleHabitToday(id)}
        />
        <p className={completed ? "line-through text-gray-400" : ""}>
          {title}
        </p>
      </div>

      <button
        onClick={() => onDelete(id)}
        className="text-red-500 hover:text-red-700 font-bold"
      >
        Delete
      </button>
    </div>
  );
}

export default HabitItem;