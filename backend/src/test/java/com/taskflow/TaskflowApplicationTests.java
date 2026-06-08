package com.taskflow;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

/**
 * Smoke test – verifies that the Spring application context starts without errors.
 *
 * Workshop note:
 *   Participants can add more tests here as they implement each checkpoint.
 *   Run with:  ./gradlew test
 */
@SpringBootTest
@ActiveProfiles("test")
class TaskflowApplicationTests {

    @Test
    void contextLoads() {
        // If this test passes, the application context wired up correctly.
    }
}
