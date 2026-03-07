import { useContext } from 'react';

import { TaskContext } from '../context/TaskContext';
import { HabitContext } from '../context/HabitContext';

import Statscard from './statscard';
import Progressbar from './progressbar';
import HabitList from './HabitList';
import TaskList from './TaskList';

function DashboardInsights() {
  const contexttask = useContext(TaskContext);
  if (!contexttask) throw new Error('');
  const {
    setTasks, tasks, totalTasks, completedTasksCount,
    pendingTasks, completionPercentage,
    todayVsYesterdayInsight, mostProductiveDayInsight,
  } = contexttask;

  const contexthabit = useContext(HabitContext);
  if (!contexthabit) throw new Error('');
  const { habits, setHabits, today, totalHabits, activeStreakCount, habitDoneToday } = contexthabit;

  return (
    <div className="space-y-10">

      {/* ===================== OVERVIEW ===================== */}
      <section>
        <h2 className="text-lg font-semibold text-black mb-5">Overview</h2>

        {/* Task Metrics */}
        <div className="mb-6">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-3">Tasks</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <Statscard icon="📝" title="Created" trend={totalTasks} />
            <Statscard icon="✅" title="Completed" trend={completedTasksCount} />
            <Statscard icon="⏳" title="Pending" trend={pendingTasks} />
            <Statscard icon="📊" title="Completion" trend={`${completionPercentage.toFixed(0)}%`} />
          </div>
        </div>

        {/* Habit Metrics */}
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-3">Habits</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <Statscard icon="📋" title="Total" trend={totalHabits} />
            <Statscard icon="✅" title="Done Today" trend={habitDoneToday} />
            <Statscard icon="🔥" title="Streaks" trend={activeStreakCount} />
            <Statscard
              icon="📈"
              title="Completion"
              trend={`${totalHabits === 0 ? 0 : ((habitDoneToday / totalHabits) * 100).toFixed(0)}%`}
            />
          </div>
        </div>
      </section>

      {/* ===================== PROGRESS ===================== */}
      <section>
        <h2 className="text-lg font-semibold text-black mb-5">Progress</h2>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5">
          <Progressbar
            value={totalTasks === 0 ? 0 : (completedTasksCount / totalTasks) * 100}
            color="bg-teal-500"
            label="Tasks Completed"
            showpercent={true}
          />
          <Progressbar
            value={totalHabits === 0 ? 0 : (habitDoneToday / totalHabits) * 100}
            color="bg-green-500"
            label="Habits Done Today"
            showpercent={true}
          />
        </div>
      </section>

      {/* ===================== INSIGHTS ===================== */}
      <section>
        <h2 className="text-lg font-semibold text-black mb-5">Insights</h2>
        <div className="space-y-3">

          {/* Most Productive Day */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-xl shrink-0">
              📅
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                {mostProductiveDayInsight.message}
              </p>
              {mostProductiveDayInsight.day && (
                <p className="text-xs text-slate-400 mt-1">
                  {mostProductiveDayInsight.count} task(s) completed on {mostProductiveDayInsight.day}
                </p>
              )}
            </div>
          </div>

          {/* Today vs Yesterday */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
              todayVsYesterdayInsight.trend === 'up' ? 'bg-green-500/10' :
              todayVsYesterdayInsight.trend === 'down' ? 'bg-red-500/10' : 'bg-slate-800'
            }`}>
              {todayVsYesterdayInsight.trend === 'up' && '⬆️'}
              {todayVsYesterdayInsight.trend === 'down' && '⬇️'}
              {todayVsYesterdayInsight.trend === 'same' && '➖'}
            </div>
            <p className={`text-sm font-medium ${
              todayVsYesterdayInsight.trend === 'up' ? 'text-green-400' :
              todayVsYesterdayInsight.trend === 'down' ? 'text-red-400' : 'text-slate-400'
            }`}>
              {todayVsYesterdayInsight.message}
            </p>
          </div>
        </div>
      </section>

      {/* ===================== ACTIVITY ===================== */}
      <section>
        <h2 className="text-lg font-semibold text-black mb-5">Activity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-slate-300 mb-4">Habits</h3>
            <HabitList habits={habits} setHabits={setHabits} today={today} />
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-slate-300 mb-4">Tasks</h3>
            <TaskList tasks={tasks} setTasks={setTasks} />
          </div>
        </div>
      </section>

    </div>
  );
}

export default DashboardInsights;