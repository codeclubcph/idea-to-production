"use client";

/**
 * TaskFormWrapper
 *
 * A thin Client Component that wraps <TaskForm /> and wires up
 * the onSuccess callback to router.refresh().
 *
 * Why a wrapper?  page.tsx is a Server Component (async, fetches data).
 * Client hooks like useRouter cannot be used there.  This wrapper lives
 * on the client, calls router.refresh() after a task is created, which
 * causes Next.js to re-run the server component and show the new task.
 */

import { useRouter } from "next/navigation";
import TaskForm from "./TaskForm";

export default function TaskFormWrapper() {
  const router = useRouter();

  return <TaskForm onSuccess={() => router.refresh()} />;
}
