package com.taskflow.service;

import com.taskflow.model.Task;
import com.taskflow.model.TaskStatus;
import com.taskflow.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * Checkpoint 2 – Task Service Tests
 *
 * These are pure unit tests – no Spring context, no database.
 * The repository is replaced by a Mockito mock so tests run instantly.
 *
 * STATUS: All tests FAIL until you implement TaskService.
 *         Work through them one method at a time.
 *
 * Run with:  ./gradlew test --tests "com.taskflow.service.TaskServiceTest"
 */
@ExtendWith(MockitoExtension.class)
@DisplayName("Checkpoint 2 – TaskService")
class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    private Task sampleTask;

    @BeforeEach
    void setUp() {
        sampleTask = new Task("Sample task", "A description");
    }

    // -------------------------------------------------------------------------
    // getAllTasks()
    // -------------------------------------------------------------------------

    @Test
    @DisplayName("getAllTasks() returns every task from the repository")
    void getAllTasks_returnsAllTasks() {
        when(taskRepository.findAll()).thenReturn(List.of(
            new Task("Task 1", null),
            new Task("Task 2", null)
        ));

        List<Task> result = taskService.getAllTasks();

        assertThat(result).hasSize(2);
        verify(taskRepository).findAll();
    }

    // -------------------------------------------------------------------------
    // getTaskById()
    // -------------------------------------------------------------------------

    @Test
    @DisplayName("getTaskById() returns the task when it exists")
    void getTaskById_whenExists_returnsTask() {
        when(taskRepository.findById(1L)).thenReturn(Optional.of(sampleTask));

        Task result = taskService.getTaskById(1L);

        assertThat(result.getTitle()).isEqualTo("Sample task");
        verify(taskRepository).findById(1L);
    }

    @Test
    @DisplayName("getTaskById() throws an exception when the task does not exist")
    void getTaskById_whenNotFound_throwsException() {
        when(taskRepository.findById(99L)).thenReturn(Optional.empty());

        // Hint: throw a RuntimeException (e.g. new RuntimeException("Task not found"))
        //       or a custom NotFoundException from your service implementation.
        assertThatThrownBy(() -> taskService.getTaskById(99L))
            .isInstanceOf(RuntimeException.class);
    }

    // -------------------------------------------------------------------------
    // createTask()
    // -------------------------------------------------------------------------

    @Test
    @DisplayName("createTask() saves the task and returns the saved version")
    void createTask_savesAndReturnsTask() {
        when(taskRepository.save(any(Task.class))).thenReturn(sampleTask);

        Task result = taskService.createTask(sampleTask);

        assertThat(result.getTitle()).isEqualTo("Sample task");
        verify(taskRepository).save(sampleTask);
    }

    // -------------------------------------------------------------------------
    // updateTask()
    // -------------------------------------------------------------------------

    @Test
    @DisplayName("updateTask() changes the title, description, and status")
    void updateTask_updatesFields() {
        Task updated = new Task("Updated title", "Updated description");
        updated.setStatus(TaskStatus.IN_PROGRESS);

        when(taskRepository.findById(1L)).thenReturn(Optional.of(sampleTask));
        when(taskRepository.save(any(Task.class))).thenAnswer(inv -> inv.getArgument(0));

        Task result = taskService.updateTask(1L, updated);

        assertThat(result.getTitle()).isEqualTo("Updated title");
        assertThat(result.getDescription()).isEqualTo("Updated description");
        assertThat(result.getStatus()).isEqualTo(TaskStatus.IN_PROGRESS);
        verify(taskRepository).save(any(Task.class));
    }

    // -------------------------------------------------------------------------
    // deleteTask()
    // -------------------------------------------------------------------------

    @Test
    @DisplayName("deleteTask() calls repository.deleteById()")
    void deleteTask_callsDeleteById() {
        doNothing().when(taskRepository).deleteById(1L);

        taskService.deleteTask(1L);

        verify(taskRepository).deleteById(1L);
    }
}
