package com.taskflow.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Web/MVC configuration for the TaskFlow backend.
 *
 * CORS (Cross-Origin Resource Sharing):
 *   Browsers block JavaScript from calling APIs on a different domain/port
 *   unless the server explicitly allows it. This config whitelists our frontend.
 *
 *   During the workshop the frontend runs on http://localhost:3000
 *   and the backend on http://localhost:8080 – different ports = different origins.
 *
 * The allowed origin is configurable via the CORS_ALLOWED_ORIGINS environment variable
 * so we don't need to change code when running inside Docker.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${cors.allowed-origins:http://localhost:3000}")
    private String allowedOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(allowedOrigins)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*");
    }
}
