import TaskItem from './TaskItems';
import type { Task } from '../types';

interface TaskListProp {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  ClassName?: string;
}

function TaskList({ tasks, setTasks, ClassName }: TaskListProp) {
  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task;
        const isCompleting = !task.completed;
        return {
          ...task,
          completed: isCompleting,
          completedAt: isCompleting ? new Date().toISOString() : null,
        };
      })
    );
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className={ClassName}>
      {tasks && tasks.length > 0 ? (
        <div className="space-y-2">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              callbacks={{ onToggle: toggleTask, onDelete: handleDelete }}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-2xl mb-3">
            ✅
          </div>
          <p className="text-slate-400 text-sm font-medium">No tasks yet</p>
          <p className="text-slate-600 text-xs mt-1">Create your first task to get started</p>
        </div>
      )}
    </div>
  );
}

export default TaskList;