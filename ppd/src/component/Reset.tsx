import { useContext, useState } from 'react';
import { TaskContext } from '../context/TaskContext';
import { HabitContext } from '../context/HabitContext';

function Reset() {
  const taskContext = useContext(TaskContext);
  if (!taskContext) throw new Error('TaskContext must be used within its Provider');
  const { setTasks } = taskContext;

  const habitContext = useContext(HabitContext);
  if (!habitContext) throw new Error('HabitContext must be used within its Provider');
  const { setHabits } = habitContext;

  const [confirm, setConfirm] = useState<'tasks' | 'habits' | null>(null);

  function resettasks() {
    setTasks([]);
    setConfirm(null);
  }

  function resethabits() {
    setHabits([]);
    setConfirm(null);
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">

      {/* Header */}
      <div>
        <h2 className="text-white font-semibold text-lg">Reset Data</h2>
        <p className="text-slate-500 text-xs mt-1">
          This will permanently delete your data and cannot be undone.
        </p>
      </div>

      {/* Actions */}
      <div className="space-y-3">

        {/* Reset Tasks */}
        <div className="flex items-center justify-between bg-slate-800 border border-slate-700 rounded-xl px-4 py-3">
          <div>
            <p className="text-white text-sm font-medium">Reset Tasks</p>
            <p className="text-slate-500 text-xs">Remove all your tasks</p>
          </div>
          {confirm === 'tasks' ? (
            <div className="flex gap-2">
              <button
                onClick={resettasks}
                className="px-3 py-1.5 rounded-lg text-xs bg-red-500 hover:bg-red-400 text-white font-medium transition"
              >
                Confirm
              </button>
              <button
                onClick={() => setConfirm(null)}
                className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:bg-slate-700 border border-slate-600 transition"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirm('tasks')}
              className="px-3 py-1.5 rounded-lg text-xs text-red-400 hover:bg-red-500/10 border border-red-500/20 transition"
            >
              Reset
            </button>
          )}
        </div>

        {/* Reset Habits */}
        <div className="flex items-center justify-between bg-slate-800 border border-slate-700 rounded-xl px-4 py-3">
          <div>
            <p className="text-white text-sm font-medium">Reset Habits</p>
            <p className="text-slate-500 text-xs">Remove all your habits</p>
          </div>
          {confirm === 'habits' ? (
            <div className="flex gap-2">
              <button
                onClick={resethabits}
                className="px-3 py-1.5 rounded-lg text-xs bg-red-500 hover:bg-red-400 text-white font-medium transition"
              >
                Confirm
              </button>
              <button
                onClick={() => setConfirm(null)}
                className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:bg-slate-700 border border-slate-600 transition"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirm('habits')}
              className="px-3 py-1.5 rounded-lg text-xs text-red-400 hover:bg-red-500/10 border border-red-500/20 transition"
            >
              Reset
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

export default Reset;