"use client";

/**
 * TaskForm – Checkpoint 7
 *
 * A controlled form that lets users create new tasks.
 * It calls createTask() from the API client and then calls onSuccess()
 * (provided by the parent) so the parent can refresh the task list.
 *
 * "use client" is required because this component uses React state and
 * browser events, which cannot run in a Next.js Server Component.
 */

import { useState, FormEvent } from "react";
import { createTask } from "@/lib/api";

interface TaskFormProps {
  /** Called after a task is successfully created so the parent can refresh. */
  onSuccess?: () => void;
}

export default function TaskForm({ onSuccess }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);
    setError(null);

    try {
      await createTask({ title: title.trim(), description: description.trim() || undefined });
      setTitle("");
      setDescription("");
      onSuccess?.();
    } catch {
      setError("Failed to create task. Is the backend running?");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form data-testid="task-form" onSubmit={handleSubmit}>
      <div style={{ marginBottom: "0.75rem" }}>
        <label htmlFor="task-title" style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>
          Title <span aria-hidden>*</span>
        </label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          required
          style={{
            width: "100%",
            padding: "0.5rem 0.75rem",
            border: "1px solid #ccc",
            borderRadius: "6px",
            fontSize: "1rem",
          }}
        />
      </div>

      <div style={{ marginBottom: "0.75rem" }}>
        <label htmlFor="task-description" style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>
          Description
        </label>
        <textarea
          id="task-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional details…"
          rows={3}
          style={{
            width: "100%",
            padding: "0.5rem 0.75rem",
            border: "1px solid #ccc",
            borderRadius: "6px",
            fontSize: "1rem",
            resize: "vertical",
          }}
        />
      </div>

      {error && (
        <p role="alert" style={{ color: "#c00", marginBottom: "0.5rem" }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting || !title.trim()}
        style={{
          padding: "0.5rem 1.25rem",
          background: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          fontSize: "1rem",
          cursor: submitting ? "not-allowed" : "pointer",
          opacity: submitting ? 0.7 : 1,
        }}
      >
        {submitting ? "Adding…" : "Add Task"}
      </button>
    </form>
  );
}
