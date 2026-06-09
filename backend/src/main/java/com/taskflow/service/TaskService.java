package com.taskflow.service;

import com.taskflow.model.Task;
import com.taskflow.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * The service layer contains the business logic of the application.
 *
 * It sits between the controller (HTTP layer) and the repository (database layer).
 * Controllers should NEVER talk directly to repositories – always go through a service.
 *
 * @Service tells Spring to create a single shared instance (singleton bean) of this class.
 *
 * =========================================================================
 * CHECKPOINT 2 – Implement the service methods below
 * =========================================================================
 */
@Service
public class TaskService {

    // Spring automatically injects TaskRepository here (constructor injection).
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    // -------------------------------------------------------------------------
    // TODO [Checkpoint 2]: Implement the methods below
    // -------------------------------------------------------------------------

    /**
     * Returns all tasks from the database.
     */
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    /**
     * Finds a single task by its ID.
     * Throws RuntimeException if the task doesn't exist.
     */
    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
    }

    /**
     * Creates and saves a new task.
     */
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    /**
     * Updates an existing task.
     * Fetches the existing task, updates its fields, then saves.
     */
    public Task updateTask(Long id, Task updatedTask) {
        Task existing = getTaskById(id);
        existing.setTitle(updatedTask.getTitle());
        existing.setDescription(updatedTask.getDescription());
        existing.setStatus(updatedTask.getStatus());
        return taskRepository.save(existing);
    }

    /**
     * Deletes a task by its ID.
     */
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}
