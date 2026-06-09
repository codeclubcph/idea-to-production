/**
 * Home page – TaskFlow
 *
 * This is a Next.js App Router Server Component.
 * It fetches tasks from the backend at request time and renders them.
 *
 * Checkpoint 6: Displays tasks from the backend via <TaskList />.
 * Checkpoint 7: Includes <TaskForm /> to create new tasks.
 */

import { fetchTasks } from "@/lib/api";
import TaskList from "@/components/TaskList";
import TaskFormWrapper from "@/components/TaskFormWrapper";
import type { Task } from "@/types/task";

export default async function HomePage() {
  let tasks: Task[] = [];
  let fetchError: string | null = null;

  try {
    tasks = await fetchTasks();
  } catch {
    fetchError = "Could not reach the backend. Is it running?";
  }

  return (
    <main>
      <div className="card">
        <h1>🚀 TaskFlow</h1>
        <h2>Workshop App</h2>
        <p>
          A simple task manager built during the{" "}
          <strong>Fullstack Development Workshop</strong>.
        </p>
      </div>

      {/* Checkpoint 7 – task creation form */}
      <div className="card">
        <h2>➕ New Task</h2>
        <TaskFormWrapper />
      </div>

      {/* Checkpoint 6 – task list */}
      <div className="card">
        <h2>📝 Tasks</h2>
        {fetchError ? (
          <p role="alert" style={{ color: "#c00" }}>
            {fetchError}
          </p>
        ) : (
          <TaskList tasks={tasks} />
        )}
      </div>
    </main>
  );
}
