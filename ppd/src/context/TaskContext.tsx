import { createContext, useState, useEffect } from 'react';
import type { TaskContextType, Task, MostProductiveDayInsight} from '../types';
import type { ReactNode} from 'react';

export const TaskContext = createContext <TaskContextType | null > (null);

const TASKS_KEY = 'ppd_tasks';

const MOCK_TASKS : Task [] = [
  {
    id: 1,
    title: 'work on my react js skill',
    completed: true,
    completedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'learn typescript',
    completed: true,
    completedAt: new Date().toISOString(),
  },
];


function normalizeDate(date : Date | string ) : Date{
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function isToday(date : string | null ) : boolean{
  if (!date) return false;

  return normalizeDate(date).getTime() === normalizeDate(new Date()).getTime();
}

function isYesterday(date : string | null) : boolean  {
  if (!date) return false;

  const yesterday = normalizeDate(new Date());
  yesterday.setDate(yesterday.getDate() - 1);


  return normalizeDate(date).getTime() === yesterday.getTime();
}

// ---------- STORAGE ----------
function loadTasks() : Task [] {
  try {
    const raw = localStorage.getItem(TASKS_KEY);
    if (!raw) return MOCK_TASKS;

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return MOCK_TASKS;

    return parsed;
  } catch (error) {
    console.error('Failed to load tasks:', error);
    return MOCK_TASKS;
  }
}

interface TaskProp {
  children : ReactNode
}


// ---------- PROVIDER ----------
function TaskProvider({ children } : TaskProp) {
  const [tasks, setTasks] = useState(() => loadTasks());

  // ---------- ACTIONS ----------
  const addTask = (title : string) => {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
      completedAt: null,
    };

    setTasks((prev) => [...prev, newTask]);
  };

  // ---------- BASIC STATS ----------
  const totalTasks = tasks.length;

  const completedTasksArray = tasks.filter(
    (task) => task.completed && task.completedAt,
  );

  // ---------- INSIGHT: MOST PRODUCTIVE DAY ----------
  let mostProductiveDayInsight : MostProductiveDayInsight

  if (completedTasksArray.length === 0) {
    mostProductiveDayInsight = {
      day: null,
      count: 0,
      message: 'No productivity data yet',
    };
  } else {
    const counts : Record<string, number> = {};
    let mostFrequentDay = null;
    let maxCount = 0;

    completedTasksArray.forEach((task) => {
      const date = new Date(task.completedAt);
      const weekday = date.toLocaleDateString('en-US', {
        weekday: 'long',
        timeZone: 'UTC',
      });

      counts[weekday] = (counts[weekday] || 0) + 1;

      if (counts[weekday] > maxCount) {
        maxCount = counts[weekday];
        mostFrequentDay = weekday;
      }
    });

    mostProductiveDayInsight = {
      day: mostFrequentDay,
      count: maxCount,
      message: `Your most productive day is ${mostFrequentDay}`,
    };
  }

  const completedTasksCount = completedTasksArray.length;

  const pendingTasks = totalTasks - completedTasksCount;

  const completionPercentage =
    totalTasks === 0 ? 0 : (completedTasksCount / totalTasks) * 100;

  // ---------- TIME-BASED COUNTS ----------
  const todayCompletedCount = completedTasksArray.filter((task) =>
    isToday(task.completedAt),
  ).length;

  const yesterdayCompletedCount = completedTasksArray.filter((task) =>
    isYesterday(task.completedAt),
  ).length;

  // ---------- INSIGHT: TODAY VS YESTERDAY ----------
  const difference = todayCompletedCount - yesterdayCompletedCount;

  let  trend : "up" | "down" | "same" = 'same'
  let message = 'You completed the same number of tasks as yesterday';

  if (difference > 0) {
    trend = 'up';

    if (yesterdayCompletedCount === 0) {
      message = `Great start! You completed ${todayCompletedCount} task(s) today`;
    } else {
      message = `You completed ${difference} more task(s) today`;
    }
  }

  if (difference < 0) {
    trend = 'down';
    message = 'You completed fewer tasks than yesterday';
  }

  const todayVsYesterdayInsight = {
    today: todayCompletedCount,
    yesterday: yesterdayCompletedCount,
    difference,
    trend,
    message,
  };

  // ---------- PERSIST ----------
  useEffect(() => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // ---------- PROVIDER VALUE ----------
  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
    
        addTask,

        totalTasks,
        completedTasksCount,
        pendingTasks,
        completionPercentage,

        todayCompletedCount,
        yesterdayCompletedCount,
        todayVsYesterdayInsight,
        mostProductiveDayInsight,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export default TaskProvider;
