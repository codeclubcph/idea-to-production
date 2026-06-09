/**
 * Checkpoint 7 – TaskForm tests
 */

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskForm from "./TaskForm";
import * as api from "@/lib/api";
import type { Task } from "@/types/task";

jest.mock("@/lib/api");
const mockCreateTask = api.createTask as jest.MockedFunction<typeof api.createTask>;

const createdTask: Task = {
  id: 99,
  title: "New task",
  description: null,
  status: "TODO",
  createdAt: "2024-01-15T10:30:00",
};

describe("TaskForm", () => {
  beforeEach(() => jest.clearAllMocks());

  it("renders the title input and submit button", () => {
    render(<TaskForm />);
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add task/i })).toBeInTheDocument();
  });

  it("disables the submit button when the title is empty", () => {
    render(<TaskForm />);
    expect(screen.getByRole("button", { name: /add task/i })).toBeDisabled();
  });

  it("enables the submit button when a title is typed", async () => {
    const user = userEvent.setup();
    render(<TaskForm />);

    await user.type(screen.getByLabelText(/title/i), "My new task");

    expect(screen.getByRole("button", { name: /add task/i })).toBeEnabled();
  });

  it("calls createTask with the entered title on submit", async () => {
    const user = userEvent.setup();
    mockCreateTask.mockResolvedValue(createdTask);
    render(<TaskForm />);

    await user.type(screen.getByLabelText(/title/i), "My new task");
    await user.click(screen.getByRole("button", { name: /add task/i }));

    await waitFor(() => {
      expect(mockCreateTask).toHaveBeenCalledWith(
        expect.objectContaining({ title: "My new task" })
      );
    });
  });

  it("clears the form after successful submission", async () => {
    const user = userEvent.setup();
    mockCreateTask.mockResolvedValue(createdTask);
    render(<TaskForm />);

    await user.type(screen.getByLabelText(/title/i), "My new task");
    await user.click(screen.getByRole("button", { name: /add task/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/title/i)).toHaveValue("");
    });
  });

  it("calls onSuccess callback after successful submission", async () => {
    const user = userEvent.setup();
    mockCreateTask.mockResolvedValue(createdTask);
    const onSuccess = jest.fn();
    render(<TaskForm onSuccess={onSuccess} />);

    await user.type(screen.getByLabelText(/title/i), "My new task");
    await user.click(screen.getByRole("button", { name: /add task/i }));

    await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
  });

  it("shows an error message when createTask fails", async () => {
    const user = userEvent.setup();
    mockCreateTask.mockRejectedValue(new Error("Network error"));
    render(<TaskForm />);

    await user.type(screen.getByLabelText(/title/i), "My new task");
    await user.click(screen.getByRole("button", { name: /add task/i }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
  });
});
