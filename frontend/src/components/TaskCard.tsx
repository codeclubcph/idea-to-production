/**
 * TaskCard – Checkpoint 6 + 8
 *
 * Displays a single task: title, optional description, status selector,
 * creation timestamp, and a delete button.
 */

"use client";

import { useRouter } from "next/navigation";
import type { Task, TaskStatus } from "@/types/task";
import { updateTask, deleteTask } from "@/lib/api";

interface TaskCardProps {
  task: Task;
}

const STATUS_LABELS: Record<TaskStatus, string> = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
};

const STATUS_COLORS: Record<TaskStatus, string> = {
  TODO: "#e3f2fd",
  IN_PROGRESS: "#fff8e1",
  DONE: "#e8f5e9",
};

export default function TaskCard({ task }: TaskCardProps) {
  const router = useRouter();

  const formattedDate = new Date(task.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  async function handleStatusChange(newStatus: TaskStatus) {
    await updateTask(task.id, {
      title: task.title,
      description: task.description ?? undefined,
      status: newStatus,
    });
    router.refresh();
  }

  async function handleDelete() {
    await deleteTask(task.id);
    router.refresh();
  }

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

      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
        <select
          data-testid="status-select"
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value as TaskStatus)}
          style={{
            background: STATUS_COLORS[task.status],
            border: "1px solid #ccc",
            borderRadius: "12px",
            padding: "0.25rem 0.5rem",
            fontSize: "0.75rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {(Object.keys(STATUS_LABELS) as TaskStatus[]).map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>

        <button
          data-testid="delete-button"
          onClick={handleDelete}
          aria-label="Delete task"
          style={{
            background: "transparent",
            border: "1px solid #f44336",
            borderRadius: "6px",
            color: "#f44336",
            cursor: "pointer",
            fontSize: "0.75rem",
            padding: "0.25rem 0.5rem",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
