/**
 * TypeScript types for the Task domain object.
 *
 * These mirror the Java Task entity and TaskStatus enum in the backend.
 * Keeping them in sync is a good habit – in a production app you might
 * auto-generate these from an OpenAPI spec.
 *
 * Workshop note:
 *   Participants will use these types when connecting the frontend to the
 *   backend API (Checkpoint 5).
 */

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  createdAt: string; // ISO 8601 date-time string, e.g. "2024-01-15T10:30:00"
}

/**
 * Shape of the request body when creating a new task.
 * The id and createdAt are set by the backend, so we omit them here.
 *
 * TODO [Checkpoint 7]: Use this type in your task creation form.
 */
export interface CreateTaskRequest {
  title: string;
  description?: string;
}

/**
 * Shape of the request body when updating an existing task.
 *
 * TODO [Checkpoint 7]: Use this type in your task update form.
 */
export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  status?: TaskStatus;
}
