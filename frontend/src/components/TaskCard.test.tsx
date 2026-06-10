/**
 * Checkpoint 6 + 8 – TaskCard tests
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TaskCard from "./TaskCard";
import type { Task } from "@/types/task";

// ── Mocks ──────────────────────────────────────────────────────────────────

const mockRefresh = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: mockRefresh }),
}));

const mockUpdateTask = jest.fn();
const mockDeleteTask = jest.fn();
jest.mock("@/lib/api", () => ({
  updateTask: (...args: unknown[]) => mockUpdateTask(...args),
  deleteTask: (...args: unknown[]) => mockDeleteTask(...args),
}));

// ── Fixtures ───────────────────────────────────────────────────────────────

const baseTask: Task = {
  id: 1,
  title: "Buy groceries",
  description: "Milk, eggs, bread",
  status: "TODO",
  createdAt: "2024-01-15T10:30:00",
};

// ── Tests ──────────────────────────────────────────────────────────────────

describe("TaskCard", () => {
  beforeEach(() => {
    mockRefresh.mockReset();
    mockUpdateTask.mockResolvedValue({ ...baseTask });
    mockDeleteTask.mockResolvedValue(undefined);
  });

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

  it("renders the card container", () => {
    render(<TaskCard task={baseTask} />);
    expect(screen.getByTestId("task-card")).toBeInTheDocument();
  });

  it("renders a status select with the current status selected", () => {
    render(<TaskCard task={{ ...baseTask, status: "IN_PROGRESS" }} />);
    const select = screen.getByTestId("status-select") as HTMLSelectElement;
    expect(select.value).toBe("IN_PROGRESS");
  });

  it("renders a delete button", () => {
    render(<TaskCard task={baseTask} />);
    expect(screen.getByTestId("delete-button")).toBeInTheDocument();
  });

  it("calls updateTask and refreshes when status is changed", async () => {
    render(<TaskCard task={baseTask} />);
    fireEvent.change(screen.getByTestId("status-select"), {
      target: { value: "IN_PROGRESS" },
    });
    await waitFor(() => expect(mockUpdateTask).toHaveBeenCalledWith(1, {
      title: "Buy groceries",
      description: "Milk, eggs, bread",
      status: "IN_PROGRESS",
    }));
    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });

  it("calls deleteTask and refreshes when delete button is clicked", async () => {
    render(<TaskCard task={baseTask} />);
    fireEvent.click(screen.getByTestId("delete-button"));
    await waitFor(() => expect(mockDeleteTask).toHaveBeenCalledWith(1));
    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });
});
