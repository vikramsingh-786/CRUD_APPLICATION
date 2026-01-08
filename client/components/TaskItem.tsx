import { CheckCircle, Circle, Trash2 } from "lucide-react";
import { Task } from "@/types";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  return (
    <div
      className="group p-5 rounded-2xl flex items-start gap-4 hover:shadow-md transition-all"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
      }}
    >
      <button onClick={() => onToggle(task._id, task.status)}>
        {task.status === "completed" ? (
          <CheckCircle className="text-green-500" />
        ) : (
          <Circle className="text-slate-400 hover:text-blue-500 transition" />
        )}
      </button>

      <div className="flex-1">
        <p
          className="font-medium"
          style={{
            color:
              task.status === "completed"
                ? "var(--card-muted)"
                : "var(--card-title)",
            textDecoration:
              task.status === "completed" ? "line-through" : "none",
          }}
        >
          {task.title}
        </p>
        <p
          className="text-xs mt-1"
          style={{ color: "var(--card-muted)" }}
        >
          {new Date(task.createdAt).toLocaleDateString()}
        </p>
      </div>

      <button
        onClick={() => onDelete(task._id)}
        className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition"
      >
        <Trash2 />
      </button>
    </div>
  );
};