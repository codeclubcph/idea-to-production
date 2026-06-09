/**
 * StatusBadge – Checkpoint 6
 *
 * Renders a colour-coded badge for a task's status.
 * The colours map to the three TaskStatus values: TODO, IN_PROGRESS, DONE.
 */

import type { TaskStatus } from "@/types/task";

interface StatusBadgeProps {
  status: TaskStatus;
}

const STATUS_LABELS: Record<TaskStatus, string> = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
};

const STATUS_STYLES: Record<TaskStatus, React.CSSProperties> = {
  TODO: { background: "#e8eaf0", color: "#555" },
  IN_PROGRESS: { background: "#fff3cd", color: "#856404" },
  DONE: { background: "#d4edda", color: "#155724" },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      data-testid="status-badge"
      style={{
        display: "inline-block",
        padding: "0.2rem 0.6rem",
        borderRadius: "999px",
        fontSize: "0.75rem",
        fontWeight: 600,
        ...STATUS_STYLES[status],
      }}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
