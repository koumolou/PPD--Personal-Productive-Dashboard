import { useContext } from 'react';

import ProfileHeader from '../component/profieheader';
import AddTaskForm from '../component/AddTaskForm';
import AddHabitForm from '../component/AddHabitForm';
import DashboardInsights from '../component/DashboardInsights';

import { TaskContext } from '../context/TaskContext';
import { HabitContext } from '../context/HabitContext';

function Dashboard() {
  const { addTask } = useContext(TaskContext);
  const { addHabit } = useContext(HabitContext);

  return (
    <div className="space-y-10">
      {/* ===================== PROFILE ===================== */}
      <section>
        <ProfileHeader />
      </section>

      {/* ===================== QUICK ACTIONS ===================== */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

        <div className="flex flex-col sm:flex-row gap-4">
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
