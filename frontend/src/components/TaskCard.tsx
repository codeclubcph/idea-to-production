/**
 * TaskCard – Checkpoint 6
 *
 * Displays a single task: title, optional description, status badge,
 * and the creation timestamp.
 */

import type { Task } from "@/types/task";
import StatusBadge from "./StatusBadge";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const formattedDate = new Date(task.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      data-testid="task-card"
      style={{
        background: "#fff",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "0.75rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "1rem",
      }}
    >
      <div style={{ flex: 1 }}>
        <p
          data-testid="task-title"
          style={{ fontWeight: 600, marginBottom: "0.25rem", color: "#1a1a2e" }}
        >
          {task.title}
        </p>
        {task.description && (
          <p
            data-testid="task-description"
            style={{ fontSize: "0.875rem", color: "#666", marginBottom: "0.5rem" }}
          >
            {task.description}
          </p>
        )}
        <p style={{ fontSize: "0.75rem", color: "#999", margin: 0 }}>
          Created {formattedDate}
        </p>
      </div>
      <StatusBadge status={task.status} />
    </div>
  );
}
