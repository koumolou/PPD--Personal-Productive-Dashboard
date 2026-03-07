import { useContext } from 'react';
import TaskList from '../component/TaskList';
import HabitList from '../component/HabitList';
import { TaskContext  } from '../context/TaskContext';
import { HabitContext } from '../context/HabitContext';

const Tasks = () => {
  const taskContext = useContext  (TaskContext);
  if (!taskContext)
    throw new Error('TaskContext must be used within TaskProvider');
  const { tasks, setTasks } = taskContext;

  const habitContext = useContext  ( HabitContext);
  if (!habitContext)
    throw new Error('HabitContext must be used within HabitProvider');
  const { habits, setHabits } = habitContext;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      {/* Tasks Section */}
      <section className="bg-white rounded-xl shadow-sm p-6">
        <h4 className="text-2xl font-semibold text-center mb-4">
          Tasks Created
        </h4>
        <TaskList tasks={tasks} setTasks={setTasks} />
      </section>

      {/* Habits Section */}
      <section className="bg-white rounded-xl shadow-sm p-6">
        <h4 className="text-2xl font-semibold text-center mb-4">
          Habits Created
        </h4>
        <HabitList habits={habits} setHabits={setHabits} />
      </section>
    </div>
  );
};

export default Tasks;
