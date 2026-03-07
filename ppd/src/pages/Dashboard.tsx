import { useContext } from 'react';

import ProfileHeader from '../component/profieheader';
import AddTaskForm from '../component/AddTaskForm';
import AddHabitForm from '../component/AddHabitForm';
import DashboardInsights from '../component/DashboardInsights';

import { TaskContext } from '../context/TaskContext';
import { HabitContext } from '../context/HabitContext';

function Dashboard() {
  const contexttask = useContext(TaskContext);
  if (!contexttask) throw new Error('');
  const { addTask } = contexttask;

  const contexthabit = useContext(HabitContext);
  if (!contexthabit) throw new Error('');
  const { addHabit } = contexthabit;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">

      {/* ===================== PROFILE ===================== */}
      <ProfileHeader statuss="Active ✅" />

      {/* ===================== QUICK ACTIONS ===================== */}
      <section>
        <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-3">
          Quick Actions
        </p>
        <div className="flex flex-wrap gap-3">
          <AddTaskForm addTask={addTask} />
          <AddHabitForm addHabit={addHabit} />
        </div>
      </section>

      {/* ===================== DASHBOARD CONTENT ===================== */}
      <section>
        <DashboardInsights />
      </section>

    </div>
  );
}

export default Dashboard;