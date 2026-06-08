package com.taskflow.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * The Task entity maps to the "tasks" table in PostgreSQL.
 *
 * JPA annotations explained:
 *  @Entity         – marks this class as a database entity
 *  @Table          – specifies the table name
 *  @Id             – marks the primary key field
 *  @GeneratedValue – tells JPA to auto-generate the ID value
 *  @Column         – customises column properties (name, constraints, etc.)
 *  @Enumerated     – maps a Java enum to a database column
 *
 * Workshop note:
 *  The schema is created automatically by Hibernate (ddl-auto: update).
 *  Participants do NOT need to write SQL DDL.
 */
@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TaskStatus status = TaskStatus.TODO;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // -------------------------------------------------------------------------
    // Lifecycle callbacks
    // -------------------------------------------------------------------------

    /**
     * Automatically sets createdAt before the entity is first persisted.
     * Participants will learn that @PrePersist runs just before INSERT.
     */
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /** Required by JPA – do not remove. */
    protected Task() {}

    public Task(String title, String description) {
        this.title = title;
        this.description = description;
    }

    // -------------------------------------------------------------------------
    // Getters and Setters
    // -------------------------------------------------------------------------

    public Long getId() { return id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public TaskStatus getStatus() { return status; }
    public void setStatus(TaskStatus status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }

    @Override
    public String toString() {
        return "Task{id=" + id + ", title='" + title + "', status=" + status + "}";
    }
}
