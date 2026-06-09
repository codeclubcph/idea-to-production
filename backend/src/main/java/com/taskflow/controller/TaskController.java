package com.taskflow.controller;

import com.taskflow.model.Task;
import com.taskflow.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * The TaskController exposes the Task REST API.
 *
 * REST conventions used in this project:
 *
 *   GET    /api/tasks       – list all tasks
 *   GET    /api/tasks/{id}  – get a single task
 *   POST   /api/tasks       – create a new task
 *   PUT    /api/tasks/{id}  – update an existing task
 *   DELETE /api/tasks/{id}  – delete a task
 *
 * =========================================================================
 * CHECKPOINT 3 – Implement the CRUD endpoints below
 * =========================================================================
 *
 * Useful annotations:
 *   @GetMapping, @PostMapping, @PutMapping, @DeleteMapping
 *   @PathVariable   – extracts {id} from the URL path
 *   @RequestBody    – deserialises the JSON request body into a Java object
 *   ResponseEntity  – lets you control status code + body
 *
 * Example skeleton for GET /api/tasks:
 *
 *   @GetMapping
 *   public ResponseEntity<List<Task>> getAllTasks() {
 *       List<Task> tasks = taskService.getAllTasks();
 *       return ResponseEntity.ok(tasks);
 *   }
 * =========================================================================
 */
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // GET /api/tasks
    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        return ResponseEntity.ok(taskService.getAllTasks());
    }

    // GET /api/tasks/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(taskService.getTaskById(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // POST /api/tasks
    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        Task created = taskService.createTask(task);
        return ResponseEntity.status(201).body(created);
    }

    // PUT /api/tasks/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task task) {
        try {
            return ResponseEntity.ok(taskService.updateTask(id, task));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE /api/tasks/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

}
