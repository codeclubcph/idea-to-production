/**
 * TaskList – Checkpoint 6
 *
 * Renders a list of TaskCard components, or an empty-state message
 * when there are no tasks yet.
 */

import type { Task } from "@/types/task";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <p data-testid="empty-state" style={{ color: "#999", fontStyle: "italic" }}>
        No tasks yet. Add one using the form above!
      </p>
    );
  }

  return (
    <ul data-testid="task-list" style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskCard task={task} />
        </li>
      ))}
    </ul>
  );
}
