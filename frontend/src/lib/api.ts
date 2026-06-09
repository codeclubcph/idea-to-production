/**
 * API client utility – the single place where the frontend talks to the backend.
 *
 * All fetch calls go through here so that:
 *  1. The base URL is defined in one place (configurable via environment variable).
 *  2. Error handling is consistent.
 *  3. It is easy to swap the HTTP library later (e.g. axios, ky, etc.).
 *
 * The backend URL comes from NEXT_PUBLIC_API_URL (set in .env.local or Docker env).
 *
 * =========================================================================
 * CHECKPOINT 5 – Implement the API functions below
 * =========================================================================
 */

import type { Task, CreateTaskRequest, UpdateTaskRequest } from "@/types/task";

/** Base URL of the backend API. Falls back to localhost for local development. */
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

// -------------------------------------------------------------------------
// Checkpoint 5 – API functions
// -------------------------------------------------------------------------

/**
 * Fetch all tasks from the backend.
 * Calls: GET /api/tasks
 */
export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(`${API_BASE_URL}/api/tasks`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

/**
 * Fetch a single task by ID.
 * Calls: GET /api/tasks/{id}
 */
export async function fetchTask(id: number): Promise<Task> {
  const res = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Failed to fetch task ${id}`);
  return res.json();
}

/**
 * Create a new task.
 * Calls: POST /api/tasks
 */
export async function createTask(data: CreateTaskRequest): Promise<Task> {
  const res = await fetch(`${API_BASE_URL}/api/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
}

/**
 * Update an existing task.
 * Calls: PUT /api/tasks/{id}
 */
export async function updateTask(
  id: number,
  data: UpdateTaskRequest
): Promise<Task> {
  const res = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to update task ${id}`);
  return res.json();
}

/**
 * Delete a task by ID.
 * Calls: DELETE /api/tasks/{id}
 */
export async function deleteTask(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`Failed to delete task ${id}`);
}
