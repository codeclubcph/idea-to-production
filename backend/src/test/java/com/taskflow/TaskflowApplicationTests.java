package com.taskflow;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

/**
 * Smoke test – verifies that the full Spring application context starts without errors.
 *
 * ============================================================
 *  Workshop Test Suite Overview
 * ============================================================
 *
 *  Test class                   Checkpoint   Initial state
 *  ----------------------------------------------------------
 *  TaskflowApplicationTests     –            PASSES  (smoke test)
 *  TaskRepositoryTest           CP 1         PASSES  (JPA built-ins work)
 *  TaskServiceTest              CP 2         FAILS   → implement TaskService
 *  TaskControllerTest           CP 3         FAILS   → implement TaskController
 *
 *  Run ALL tests:
 *    ./gradlew test
 *
 *  Run a single checkpoint:
 *    ./gradlew test --tests "com.taskflow.service.TaskServiceTest"
 *    ./gradlew test --tests "com.taskflow.controller.TaskControllerTest"
 *
 *  Watch mode (re-runs on every file save):
 *    ./gradlew test --continuous
 * ============================================================
 */
@SpringBootTest
@ActiveProfiles("test")
class TaskflowApplicationTests {

    @Test
    void contextLoads() {
        // If this test passes, the Spring context wired up without errors.
    }
}
