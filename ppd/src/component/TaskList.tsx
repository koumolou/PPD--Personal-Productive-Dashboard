import TaskItem from './TaskItems';
import type { Task } from '../types';

interface TaskListProp {
  tasks : Task[],
  setTasks : React.Dispatch<React.SetStateAction<Task[]>>,
  ClassName?: string
  


}

function TaskList({ tasks, setTasks, ClassName } : TaskListProp ) {
  const toggleTask = (id : number) => {
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

  const handleDelete = (id : number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className={ClassName}>
      {tasks && tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            callbacks={{ onToggle: toggleTask, onDelete: handleDelete }}
          />
        ))
      ) : (
        <p className="text-center text-red-600">
          No tasks yet. Create your first task to see stats{' '}
        </p>
      )}
    </div>
  );
}

export default TaskList;
