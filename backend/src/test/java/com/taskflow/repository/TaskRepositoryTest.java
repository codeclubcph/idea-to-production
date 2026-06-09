package com.taskflow.repository;

import com.taskflow.model.Task;
import com.taskflow.model.TaskStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Checkpoint 1 – Task Repository Tests
 *
 * These tests verify that the TaskRepository works correctly.
 * They use an in-memory H2 database (no PostgreSQL needed).
 *
 * Run with:  ./gradlew test
 *
 * STATUS: The first four tests should PASS immediately because
 *         Spring Data JPA provides these methods automatically.
 *
 *         The last test (@Disabled) is for a custom finder method
 *         that YOU will add to TaskRepository in Checkpoint 1.
 *         Uncomment @Disabled and add findByStatus() to make it pass.
 */
@DataJpaTest
@ActiveProfiles("test")
@DisplayName("Checkpoint 1 – TaskRepository")
class TaskRepositoryTest {

    @Autowired
    private TaskRepository taskRepository;

    @BeforeEach
    void cleanDatabase() {
        taskRepository.deleteAll();
    }

    // -------------------------------------------------------------------------
    // Tests that pass immediately (Spring Data JPA built-ins)
    // -------------------------------------------------------------------------

    @Test
    @DisplayName("save() persists a task and auto-generates id and createdAt")
    void save_persistsTaskWithGeneratedFields() {
        Task task = new Task("Buy groceries", "Milk, eggs, bread");

        Task saved = taskRepository.save(task);

        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getTitle()).isEqualTo("Buy groceries");
        assertThat(saved.getDescription()).isEqualTo("Milk, eggs, bread");
        assertThat(saved.getStatus()).isEqualTo(TaskStatus.TODO);
        assertThat(saved.getCreatedAt()).isNotNull();
    }

    @Test
    @DisplayName("findById() returns the correct task")
    void findById_returnsCorrectTask() {
        Task saved = taskRepository.save(new Task("Write tests", null));

        Optional<Task> found = taskRepository.findById(saved.getId());

        assertThat(found).isPresent();
        assertThat(found.get().getTitle()).isEqualTo("Write tests");
    }

    @Test
    @DisplayName("findAll() returns every saved task")
    void findAll_returnsAllTasks() {
        taskRepository.save(new Task("Task A", null));
        taskRepository.save(new Task("Task B", null));
        taskRepository.save(new Task("Task C", null));

        List<Task> all = taskRepository.findAll();

        assertThat(all).hasSize(3);
    }

    @Test
    @DisplayName("deleteById() removes the task from the database")
    void deleteById_removesTask() {
        Task saved = taskRepository.save(new Task("Delete me", null));

        taskRepository.deleteById(saved.getId());

        assertThat(taskRepository.findById(saved.getId())).isEmpty();
    }

    // -------------------------------------------------------------------------
    // Checkpoint 1 exercise – uncomment @Disabled after adding findByStatus()
    // -------------------------------------------------------------------------

    @Test
    @DisplayName("[CP-1] findByStatus() returns only tasks with the given status")
    void findByStatus_returnsOnlyMatchingTasks() {
        Task todo      = new Task("Todo task", null);
        Task inProgress = new Task("In-progress task", null);
        inProgress.setStatus(TaskStatus.IN_PROGRESS);

        taskRepository.save(todo);
        taskRepository.save(inProgress);

        List<Task> results = taskRepository.findByStatus(TaskStatus.IN_PROGRESS);
        assertThat(results).hasSize(1);
        assertThat(results.get(0).getTitle()).isEqualTo("In-progress task");
    }
}
