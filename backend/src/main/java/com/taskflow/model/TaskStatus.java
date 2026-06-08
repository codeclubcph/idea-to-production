package com.taskflow.model;

/**
 * Represents the lifecycle status of a Task.
 *
 * Participants will use this enum throughout the workshop to:
 *  - Filter tasks by status (Checkpoint 2 – Service layer)
 *  - Drive UI status badges (Checkpoint 6 – Frontend display)
 */
public enum TaskStatus {

    /** Task has been created but work has not started. */
    TODO,

    /** Task is actively being worked on. */
    IN_PROGRESS,

    /** Task has been completed. */
    DONE
}
