import HabitItem from './HabitItem';
import type { Habit } from '../types';

interface HabitListProps {
  habits : Habit [],
  setHabits :  React.Dispatch<React.SetStateAction<Habit[]>>
  today : string,
  className?: string,
  

}

function HabitList({ habits, setHabits, today, className } : HabitListProps) {
  const handleDelete = (id : number) => {
    setHabits(habits.filter((h : Habit) => h.id !== id));
  };

  const toggleHabitToday = (habitId : number) => {
    setHabits(
      habits.map((h : Habit) => {
        if (h.id !== habitId) return h;

        const doneToday = h.history.includes(today);

        return {
          ...h,
          history: doneToday
            ? h.history.filter((date) => date !== today) // remove
            : [...h.history, today], // add
        };
      }),
    );
  };
  return (
    <div className={className}>
      {habits && habits.length > 0 ? (
        habits.map((h :Habit) => (
          <HabitItem
            key={h.id}
            habit={h}
            callbacks={{
              toggleHabitToday: toggleHabitToday,
              onDelete: handleDelete,
            }}
          />
        ))
      ) : (
        <>
          <p className="text-center text-red-600">
            No tasks yet. Start building consistency
          </p>
        </>
      )}
    </div>
  );
}

export default HabitList;
