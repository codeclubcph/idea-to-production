package com.taskflow.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Map;

/**
 * The controller layer handles HTTP requests and returns HTTP responses.
 *
 * @RestController = @Controller + @ResponseBody
 *   Every method return value is automatically serialised to JSON.
 *
 * @RequestMapping sets the base URL path for all methods in this class.
 */
@RestController
@RequestMapping("/health")
public class HealthController {

    /**
     * Simple health-check endpoint.
     *
     * GET /health
     * Response: 200 OK  { "status": "UP", "timestamp": "..." }
     *
     * Tip: Spring Boot Actuator also exposes GET /actuator/health with richer detail.
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> health() {
        return ResponseEntity.ok(Map.of(
            "status", "UP",
            "service", "taskflow-backend",
            "timestamp", LocalDateTime.now().toString()
        ));
    }
}
