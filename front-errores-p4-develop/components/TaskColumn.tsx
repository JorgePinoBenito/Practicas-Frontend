import { Task, TaskStatus, User } from "../types.ts";
import { TaskCard } from "./TaskCard.tsx";

interface TaskColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  columnClass: string;
  onEditTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onMoveTask: (taskId: string, status: TaskStatus) => void;
}

export function TaskColumn({
  title,
  status,
  tasks,
  columnClass,
  onEditTask,
  onDeleteTask,
  onMoveTask,
}: TaskColumnProps) {
  const getNextStatus = (currentStatus: TaskStatus): TaskStatus => {
    switch (currentStatus) {
      /*se debe cambiar
      case TaskStatus.PENDING:
        return TaskStatus.IN_PROGRESS;
      case TaskStatus.IN_PROGRESS:
        return TaskStatus.COMPLETED;
      case TaskStatus.COMPLETED:
        return TaskStatus.PENDING;
      default:
        return TaskStatus.PENDING;
        a como esta ahora debido a que el enum de los types son TODO, IN_PROGRESS Y DONE*/
      case TaskStatus.TODO:
        return TaskStatus.TODO;
      case TaskStatus.DONE:
        return TaskStatus.DONE;
      case TaskStatus.IN_PROGRESS:
        return TaskStatus.IN_PROGRESS;
      default:
        return TaskStatus.IN_PROGRESS;
    }
  };

  return (
    <div class={`task-column ${columnClass}`}>
      <h2 class="column-header">{title}</h2>
      <div class="task-list">
        {tasks.length === 0
          ? (
            <p class="text-sm text-gray-500 text-center p-4">
              No tasks in this column
            </p>
          )
          : (
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                user={task.user}
                onEdit={() => onEditTask(task._id)}
                onDelete={() => onDeleteTask(task._id)}
                onStatusChange={() =>
                  onMoveTask(task._id, getNextStatus(task.status))}
              />
            ))
          )}
      </div>
    </div>
  );
}
