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
// TODO [Checkpoint 5]: Implement these API functions
// -------------------------------------------------------------------------

/**
 * Fetch all tasks from the backend.
 * Calls: GET /api/tasks
 *
 * Example implementation:
 *   const res = await fetch(`${API_BASE_URL}/api/tasks`);
 *   if (!res.ok) throw new Error("Failed to fetch tasks");
 *   return res.json();
 */
export async function fetchTasks(): Promise<Task[]> {
  // TODO: implement
  throw new Error("fetchTasks() not implemented yet – Checkpoint 5");
}

/**
 * Fetch a single task by ID.
 * Calls: GET /api/tasks/{id}
 */
export async function fetchTask(id: number): Promise<Task> {
  // TODO: implement
  throw new Error("fetchTask() not implemented yet – Checkpoint 5");
}

/**
 * Create a new task.
 * Calls: POST /api/tasks
 */
export async function createTask(data: CreateTaskRequest): Promise<Task> {
  // TODO: implement
  throw new Error("createTask() not implemented yet – Checkpoint 5");
}

/**
 * Update an existing task.
 * Calls: PUT /api/tasks/{id}
 */
export async function updateTask(
  id: number,
  data: UpdateTaskRequest
): Promise<Task> {
  // TODO: implement
  throw new Error("updateTask() not implemented yet – Checkpoint 5");
}

/**
 * Delete a task by ID.
 * Calls: DELETE /api/tasks/{id}
 */
export async function deleteTask(id: number): Promise<void> {
  // TODO: implement
  throw new Error("deleteTask() not implemented yet – Checkpoint 5");
}
