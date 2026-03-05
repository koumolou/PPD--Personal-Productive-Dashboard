import { useState, createContext, useEffect } from 'react';

export const HabitContext = createContext();

const HABITS_KEY = 'ppd_habits';
const today = new Date().toISOString().slice(0, 10);

const MOCK_HABITS = [
  { id: 1, title: 'Working out', history: [today] },
  { id: 2, title: 'Reading', history: [today] },
  { id: 3, title: 'Meditation', history: [] },
];

function loadHabits() {
  try {
    const raw = localStorage.getItem(HABITS_KEY);
    if (!raw) return MOCK_HABITS;

    const parsed = JSON.parse(raw);

    if (
      !Array.isArray(parsed) ||
      !parsed.every(
        (h) =>
          typeof h.id === 'number' &&
          typeof h.title === 'string' &&
          Array.isArray(h.history),
      )
    ) {
      return MOCK_HABITS;
    }

    return parsed;
  } catch (error) {
    console.error('Failed to load habits:', error);
    return MOCK_HABITS;
  }
}

function HabitProvider({ children }) {
  const [habits, setHabits] = useState(() => loadHabits());

  const addHabit = (title) => {
    const newHabit = {
      id: Date.now(),
      title,
      history: [today],
    };
    setHabits((prev) => [...prev, newHabit]);
  };

  // Computed stats
  const totalHabits = habits.length;
  const habitDoneToday = habits.filter((h) => h.history.includes(today)).length;
  const activeStreakCount = habitDoneToday;
  const habitCompletion =
    totalHabits === 0 ? '0%' : (habitDoneToday / totalHabits) * 100;

  // Streak helpers
  const DAY_MS = 24 * 60 * 60 * 1000;
  const addDays = (date, days) =>
    new Date(date.getTime() + days * DAY_MS).toISOString().slice(0, 10);

  const getCurrentStreak = (history) => {
    if (!history.includes(today)) return 0;

    let streak = 1;
    let currentDate = today;

    while (true) {
      const prevDate = addDays(new Date(currentDate), -1);
      if (history.includes(prevDate)) {
        streak++;
        currentDate = prevDate;
      } else {
        break;
      }
    }

    return streak;
  };

  const getActiveHabitsCount = () =>
    habits.filter((h) => h.history.includes(today)).length;

  useEffect(() => {
    localStorage.setItem(HABITS_KEY, JSON.stringify(habits));
  }, [habits]);

  return (
    <HabitContext.Provider
      value={{
        habits,
        setHabits,
        today,
        habitDoneToday,
        activeStreakCount,
        habitCompletion,
        getActiveHabitsCount,
        getCurrentStreak,
        addHabit,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
}

export default HabitProvider;
