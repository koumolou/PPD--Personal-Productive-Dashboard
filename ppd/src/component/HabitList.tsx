import HabitItem from './HabitItem';
import type { Habit } from '../types';

interface HabitListProps {
  habits: Habit[];
  setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
  today?: string;
  className?: string;
}

function HabitList({ habits, setHabits, today, className }: HabitListProps) {
  const handleDelete = (id: number) => {
    setHabits(habits.filter((h: Habit) => h.id !== id));
  };

  const toggleHabitToday = (habitId: number) => {
    setHabits(
      habits.map((h: Habit) => {
        if (h.id !== habitId) return h;
        const doneToday = h.history.includes(today ?? '');
        return {
          ...h,
          history: doneToday
            ? h.history.filter((date) => date !== today)
            : [...h.history, today ?? ''],
        };
      }),
    );
  };

  return (
    <div className={className}>
      {habits && habits.length > 0 ? (
        <div className="space-y-2">
          {habits.map((h: Habit) => (
            <HabitItem
              key={h.id}
              habit={h}
              callbacks={{
                toggleHabitToday,
                onDelete: handleDelete,
              }}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-2xl mb-3">
            🔥
          </div>
          <p className="text-slate-400 text-sm font-medium">No habits yet</p>
          <p className="text-slate-600 text-xs mt-1">Start building consistency today</p>
        </div>
      )}
    </div>
  );
}

export default HabitList;