# =============================================================================
# Backend Dockerfile
# Multi-stage build:
#   Stage 1 (builder) – compiles the Java source and creates the JAR
#   Stage 2 (runtime) – lightweight image that only runs the JAR
#
# Multi-stage builds keep the final image small by leaving build tools behind.
# =============================================================================

# ---- Stage 1: Build ----
FROM eclipse-temurin:21-jdk AS builder

WORKDIR /workspace

# Copy Gradle wrapper and dependency declarations first.
# Docker caches each layer, so dependency downloads are only re-run
# when build.gradle or settings.gradle change (not on every source change).
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# Download dependencies (cached layer)
RUN ./gradlew dependencies --no-daemon -q

# Now copy source code and build the JAR
COPY src src
RUN ./gradlew bootJar --no-daemon -x test

# ---- Stage 2: Runtime ----
FROM eclipse-temurin:21-jre AS runtime

WORKDIR /app

# Copy only the built JAR from the builder stage
COPY --from=builder /workspace/build/libs/*.jar app.jar

# Expose the port Spring Boot listens on
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-Djava.net.preferIPv6Addresses=true", "-jar", "app.jar"]
