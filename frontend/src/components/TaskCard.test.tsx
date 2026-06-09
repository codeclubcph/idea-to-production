/**
 * Checkpoint 6 – TaskCard tests
 */

import { render, screen } from "@testing-library/react";
import TaskCard from "./TaskCard";
import type { Task } from "@/types/task";

const baseTask: Task = {
  id: 1,
  title: "Buy groceries",
  description: "Milk, eggs, bread",
  status: "TODO",
  createdAt: "2024-01-15T10:30:00",
};

describe("TaskCard", () => {
  it("renders the task title", () => {
    render(<TaskCard task={baseTask} />);
    expect(screen.getByTestId("task-title")).toHaveTextContent("Buy groceries");
  });

  it("renders the task description when present", () => {
    render(<TaskCard task={baseTask} />);
    expect(screen.getByTestId("task-description")).toHaveTextContent("Milk, eggs, bread");
  });

  it("does not render a description element when description is null", () => {
    render(<TaskCard task={{ ...baseTask, description: null }} />);
    expect(screen.queryByTestId("task-description")).toBeNull();
  });

  it("renders a StatusBadge with the correct status", () => {
    render(<TaskCard task={{ ...baseTask, status: "IN_PROGRESS" }} />);
    expect(screen.getByTestId("status-badge")).toHaveTextContent("In Progress");
  });

  it("renders the card container", () => {
    render(<TaskCard task={baseTask} />);
    expect(screen.getByTestId("task-card")).toBeInTheDocument();
  });
});
