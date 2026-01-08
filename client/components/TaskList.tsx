import { Task } from "@/types";
import { TaskItem } from "./TaskItem";
import { EmptyState } from "./EmptyState";

interface TaskListProps {
  tasks: Task[];
  searchQuery: string;
  onToggle: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}

export const TaskList = ({ tasks, searchQuery, onToggle, onDelete }: TaskListProps) => {
  if (tasks.length === 0) {
    return <EmptyState searchQuery={searchQuery} />;
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};