/**
 * Checkpoint 6 – TaskList tests
 */

import { render, screen } from "@testing-library/react";
import TaskList from "./TaskList";
import type { Task } from "@/types/task";

const makeTask = (id: number, title: string): Task => ({
  id,
  title,
  description: null,
  status: "TODO",
  createdAt: "2024-01-15T10:30:00",
});

describe("TaskList", () => {
  it("renders an empty-state message when there are no tasks", () => {
    render(<TaskList tasks={[]} />);
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  it("does not render the task list when there are no tasks", () => {
    render(<TaskList tasks={[]} />);
    expect(screen.queryByTestId("task-list")).toBeNull();
  });

  it("renders one TaskCard per task", () => {
    const tasks = [makeTask(1, "Task A"), makeTask(2, "Task B"), makeTask(3, "Task C")];
    render(<TaskList tasks={tasks} />);

    expect(screen.getAllByTestId("task-card")).toHaveLength(3);
  });

  it("renders the task list and not the empty state when tasks are present", () => {
    render(<TaskList tasks={[makeTask(1, "Task A")]} />);

    expect(screen.getByTestId("task-list")).toBeInTheDocument();
    expect(screen.queryByTestId("empty-state")).toBeNull();
  });

  it("renders task titles in the list", () => {
    render(<TaskList tasks={[makeTask(1, "Buy milk"), makeTask(2, "Write tests")]} />);

    expect(screen.getByText("Buy milk")).toBeInTheDocument();
    expect(screen.getByText("Write tests")).toBeInTheDocument();
  });
});
