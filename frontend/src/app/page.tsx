/**
 * Home page – the starting point for the TaskFlow frontend.
 *
 * This is a Next.js App Router Server Component.
 * It currently only shows a welcome screen.
 *
 * =========================================================================
 * CHECKPOINT 6 – Display tasks fetched from the backend
 * =========================================================================
 * 1. Import `fetchTasks` from "@/lib/api"
 * 2. Call it here (this is an async Server Component, so you can await it)
 * 3. Import and render a <TaskList tasks={tasks} /> component
 *
 * Example:
 *   import { fetchTasks } from "@/lib/api";
 *   import TaskList from "@/components/TaskList";
 *
 *   const tasks = await fetchTasks();
 *   return <TaskList tasks={tasks} />;
 * =========================================================================
 *
 * =========================================================================
 * CHECKPOINT 7 – Allow users to create tasks from the UI
 * =========================================================================
 * Add a <TaskForm /> component that calls `createTask` from "@/lib/api"
 * and refreshes the task list after submission.
 * =========================================================================
 */

export default function HomePage() {
  return (
    <main>
      {/* ----------------------------------------------------------------
          Workshop welcome banner – participants can replace this content
          ---------------------------------------------------------------- */}
      <div className="card">
        <h1>🚀 TaskFlow</h1>
        <h2>Workshop Starter</h2>
        <p>
          Welcome to the <strong>Fullstack Development Workshop</strong>!
          This page is your starting point. Follow the checkpoints in the{" "}
          <code>README.md</code> to build the full application.
        </p>
      </div>

      {/* ----------------------------------------------------------------
          Checkpoint progress card
          ---------------------------------------------------------------- */}
      <div className="card">
        <h2>📋 Workshop Checkpoints</h2>
        <ol style={{ paddingLeft: "1.25rem", color: "#555" }}>
          <li>Create Task repository</li>
          <li>Create Task service</li>
          <li>Create CRUD REST endpoints</li>
          <li>Test API using Postman</li>
          <li>Connect frontend to backend</li>
          <li>Display tasks in UI ← you are here</li>
          <li>Create tasks from UI</li>
          <li>Persist tasks in PostgreSQL</li>
          <li>Containerise and understand architecture</li>
          <li>Deploy application</li>
        </ol>
      </div>

      {/* ----------------------------------------------------------------
          TODO [Checkpoint 6]: Replace this placeholder with a real task list
          ---------------------------------------------------------------- */}
      <div className="card">
        <h2>📝 Tasks</h2>
        <p>
          <em>No tasks yet.</em> Complete Checkpoints 1–5 first, then replace
          this placeholder with your <code>&lt;TaskList /&gt;</code> component.
        </p>
      </div>

      {/* ----------------------------------------------------------------
          TODO [Checkpoint 7]: Add a task creation form here
          ---------------------------------------------------------------- */}
    </main>
  );
}
