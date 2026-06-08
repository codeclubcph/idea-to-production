package com.taskflow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Entry point for the TaskFlow application.
 *
 * @SpringBootApplication combines:
 *   - @Configuration        – marks this class as a source of bean definitions
 *   - @EnableAutoConfiguration – tells Spring Boot to auto-configure based on classpath
 *   - @ComponentScan        – scans this package and sub-packages for Spring components
 */
@SpringBootApplication
public class TaskflowApplication {

    public static void main(String[] args) {
        SpringApplication.run(TaskflowApplication.class, args);
    }
}
