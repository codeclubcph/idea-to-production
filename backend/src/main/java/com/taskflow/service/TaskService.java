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
     * Hint: use taskRepository.findAll()
     */
    public List<Task> getAllTasks() {
        // TODO: implement
        throw new UnsupportedOperationException("getAllTasks() not implemented yet – Checkpoint 2");
    }

    /**
     * Finds a single task by its ID.
     * Hint: use taskRepository.findById(id) – it returns an Optional<Task>
     */
    public Task getTaskById(Long id) {
        // TODO: implement
        throw new UnsupportedOperationException("getTaskById() not implemented yet – Checkpoint 2");
    }

    /**
     * Creates and saves a new task.
     * Hint: use taskRepository.save(task)
     */
    public Task createTask(Task task) {
        // TODO: implement
        throw new UnsupportedOperationException("createTask() not implemented yet – Checkpoint 2");
    }

    /**
     * Updates an existing task.
     * Hint: fetch the existing task first, update its fields, then save.
     */
    public Task updateTask(Long id, Task updatedTask) {
        // TODO: implement
        throw new UnsupportedOperationException("updateTask() not implemented yet – Checkpoint 2");
    }

    /**
     * Deletes a task by its ID.
     * Hint: use taskRepository.deleteById(id)
     */
    public void deleteTask(Long id) {
        // TODO: implement
        throw new UnsupportedOperationException("deleteTask() not implemented yet – Checkpoint 2");
    }
}
