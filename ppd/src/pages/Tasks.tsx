import { useContext } from 'react';
import TaskList from '../component/TaskList';
import HabitList from '../component/HabitList';
import { TaskContext } from '../context/TaskContext';
import { HabitContext } from '../context/HabitContext';

const Tasks = () => {
  const taskContext = useContext(TaskContext);
  if (!taskContext) throw new Error('TaskContext must be used within TaskProvider');
  const { tasks, setTasks } = taskContext;

  const habitContext = useContext(HabitContext);
  if (!habitContext) throw new Error('HabitContext must be used within HabitProvider');
  const { habits, setHabits } = habitContext;

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">

      {/* Page Header */}
      <div>
        <h1 className="text-black font-bold text-2xl">Tasks & Habits</h1>
        <p className="text-slate-500 text-xs mt-1">
          {tasks.length} task{tasks.length !== 1 ? 's' : ''} · {habits.length} habit{habits.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Tasks Section */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-lg bg-green-500/10 flex items-center justify-center text-sm">✅</div>
          <h2 className="text-white font-semibold text-sm">Tasks</h2>
          <span className="ml-auto text-xs text-slate-500">{tasks.length} total</span>
        </div>
        <TaskList tasks={tasks} setTasks={setTasks} />
      </section>

      {/* Habits Section */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-lg bg-teal-500/10 flex items-center justify-center text-sm">🔥</div>
          <h2 className="text-white font-semibold text-sm">Habits</h2>
          <span className="ml-auto text-xs text-slate-500">{habits.length} total</span>
        </div>
        <HabitList habits={habits} setHabits={setHabits} />
      </section>

    </div>
  );
};

export default Tasks;