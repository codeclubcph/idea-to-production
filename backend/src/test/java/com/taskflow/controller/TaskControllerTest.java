package com.taskflow.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.taskflow.model.Task;
import com.taskflow.model.TaskStatus;
import com.taskflow.service.TaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Disabled;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Checkpoint 3 – Task Controller Tests
 *
 * Uses MockMvc to simulate HTTP requests without starting a real server.
 * The service layer is replaced by a Mockito mock (no database involved).
 *
 * STATUS: All tests FAIL until you implement the endpoints in TaskController.
 *         Add each endpoint and re-run to see the tests turn green.
 *
 * Run with:  ./gradlew test --tests "com.taskflow.controller.TaskControllerTest"
 */
@WebMvcTest(TaskController.class)
@DisplayName("Checkpoint 3 – TaskController")
@Disabled
class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private TaskService taskService;

    private Task sampleTask;

    @BeforeEach
    void setUp() {
        sampleTask = new Task("Sample task", "A description");
    }

    // -------------------------------------------------------------------------
    // GET /api/tasks
    // -------------------------------------------------------------------------

    @Test
    @DisplayName("GET /api/tasks returns 200 and a list of tasks")
    void getAll_returns200WithTaskList() throws Exception {
        when(taskService.getAllTasks()).thenReturn(List.of(sampleTask));

        mockMvc.perform(get("/api/tasks"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$[0].title").value("Sample task"));
    }

    // -------------------------------------------------------------------------
    // GET /api/tasks/{id}
    // -------------------------------------------------------------------------

    @Test
    @DisplayName("GET /api/tasks/{id} returns 200 and the task")
    void getById_returns200WithTask() throws Exception {
        when(taskService.getTaskById(1L)).thenReturn(sampleTask);

        mockMvc.perform(get("/api/tasks/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.title").value("Sample task"))
            .andExpect(jsonPath("$.description").value("A description"));
    }

    @Test
    @DisplayName("GET /api/tasks/{id} returns 404 when task does not exist")
    void getById_whenNotFound_returns404() throws Exception {
        when(taskService.getTaskById(99L)).thenThrow(new RuntimeException("Task not found"));

        // Hint: in TaskController catch RuntimeException and return ResponseEntity.notFound()
        mockMvc.perform(get("/api/tasks/99"))
            .andExpect(status().isNotFound());
    }

    // -------------------------------------------------------------------------
    // POST /api/tasks
    // -------------------------------------------------------------------------

    @Test
    @DisplayName("POST /api/tasks returns 201 and the created task")
    void create_returns201WithCreatedTask() throws Exception {
        when(taskService.createTask(any(Task.class))).thenReturn(sampleTask);

        String requestBody = objectMapper.writeValueAsString(sampleTask);

        mockMvc.perform(post("/api/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.title").value("Sample task"));
    }

    // -------------------------------------------------------------------------
    // PUT /api/tasks/{id}
    // -------------------------------------------------------------------------

    @Test
    @DisplayName("PUT /api/tasks/{id} returns 200 and the updated task")
    void update_returns200WithUpdatedTask() throws Exception {
        Task updated = new Task("Updated title", "Updated description");
        updated.setStatus(TaskStatus.IN_PROGRESS);
        when(taskService.updateTask(eq(1L), any(Task.class))).thenReturn(updated);

        String requestBody = objectMapper.writeValueAsString(updated);

        mockMvc.perform(put("/api/tasks/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.title").value("Updated title"))
            .andExpect(jsonPath("$.status").value("IN_PROGRESS"));
    }

    // -------------------------------------------------------------------------
    // DELETE /api/tasks/{id}
    // -------------------------------------------------------------------------

    @Test
    @DisplayName("DELETE /api/tasks/{id} returns 204 No Content")
    void delete_returns204() throws Exception {
        doNothing().when(taskService).deleteTask(1L);

        mockMvc.perform(delete("/api/tasks/1"))
            .andExpect(status().isNoContent());
    }
}
