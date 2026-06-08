package com.taskflow.controller;

import com.taskflow.model.Task;
import com.taskflow.service.TaskService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    // TODO [Checkpoint 3]: Add your endpoint methods here

}
