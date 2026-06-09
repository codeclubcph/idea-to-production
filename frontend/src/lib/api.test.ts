/**
 * Checkpoint 5 – API client tests
 *
 * All HTTP calls are intercepted by mocking the global fetch function.
 * No real network requests are made.
 */

import { fetchTasks, fetchTask, createTask, updateTask, deleteTask } from "./api";
import type { Task } from "@/types/task";

const mockTask: Task = {
  id: 1,
  title: "Test task",
  description: "A description",
  status: "TODO",
  createdAt: "2024-01-15T10:30:00",
};

function mockFetch(body: unknown, ok = true, status = 200) {
  global.fetch = jest.fn().mockResolvedValue({
    ok,
    status,
    json: () => Promise.resolve(body),
  } as Response);
}

describe("Checkpoint 5 – API client", () => {
  afterEach(() => jest.resetAllMocks());

  // ---------------------------------------------------------------------------
  // fetchTasks
  // ---------------------------------------------------------------------------
  describe("fetchTasks()", () => {
    it("calls GET /api/tasks and returns the task array", async () => {
      mockFetch([mockTask]);

      const result = await fetchTasks();

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/tasks"),
        expect.objectContaining({ cache: "no-store" })
      );
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe("Test task");
    });

    it("throws when the response is not ok", async () => {
      mockFetch(null, false, 500);
      await expect(fetchTasks()).rejects.toThrow();
    });
  });

  // ---------------------------------------------------------------------------
  // fetchTask
  // ---------------------------------------------------------------------------
  describe("fetchTask(id)", () => {
    it("calls GET /api/tasks/{id} and returns the task", async () => {
      mockFetch(mockTask);

      const result = await fetchTask(1);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/tasks/1"),
        expect.anything()
      );
      expect(result.title).toBe("Test task");
    });

    it("throws when the task is not found", async () => {
      mockFetch(null, false, 404);
      await expect(fetchTask(99)).rejects.toThrow();
    });
  });

  // ---------------------------------------------------------------------------
  // createTask
  // ---------------------------------------------------------------------------
  describe("createTask(data)", () => {
    it("calls POST /api/tasks with JSON body and returns the created task", async () => {
      mockFetch(mockTask, true, 201);

      const result = await createTask({ title: "Test task", description: "A description" });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/tasks"),
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: "Test task", description: "A description" }),
        })
      );
      expect(result.title).toBe("Test task");
    });

    it("throws on a non-ok response", async () => {
      mockFetch(null, false, 400);
      await expect(createTask({ title: "x" })).rejects.toThrow();
    });
  });

  // ---------------------------------------------------------------------------
  // updateTask
  // ---------------------------------------------------------------------------
  describe("updateTask(id, data)", () => {
    it("calls PUT /api/tasks/{id} with JSON body and returns the updated task", async () => {
      const updated = { ...mockTask, title: "Updated", status: "IN_PROGRESS" as const };
      mockFetch(updated);

      const result = await updateTask(1, { title: "Updated", status: "IN_PROGRESS" });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/tasks/1"),
        expect.objectContaining({ method: "PUT" })
      );
      expect(result.title).toBe("Updated");
    });
  });

  // ---------------------------------------------------------------------------
  // deleteTask
  // ---------------------------------------------------------------------------
  describe("deleteTask(id)", () => {
    it("calls DELETE /api/tasks/{id} and resolves without a value", async () => {
      global.fetch = jest.fn().mockResolvedValue({ ok: true, status: 204 } as Response);

      await expect(deleteTask(1)).resolves.toBeUndefined();

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/tasks/1"),
        expect.objectContaining({ method: "DELETE" })
      );
    });

    it("throws when the response is not ok", async () => {
      mockFetch(null, false, 404);
      await expect(deleteTask(99)).rejects.toThrow();
    });
  });
});
