package com.taskflow.repository;

import com.taskflow.model.Task;
import com.taskflow.model.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * The repository layer is responsible for talking to the database.
 *
 * By extending JpaRepository, Spring Data JPA automatically provides:
 *  - save(task)         – INSERT or UPDATE
 *  - findById(id)       – SELECT by primary key
 *  - findAll()          – SELECT all rows
 *  - deleteById(id)     – DELETE by primary key
 *  - count()            – COUNT(*)
 *  ... and many more – no SQL needed!
 *
 * =========================================================================
 * CHECKPOINT 1 – Add custom query methods here
 * =========================================================================
 *
 * Example: find tasks by status
 *
 *   List<Task> findByStatus(TaskStatus status);
 *
 * Spring Data JPA derives the SQL automatically from the method name.
 * =========================================================================
 */
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    /**
     * Returns all tasks that match the given status.
     * Spring Data JPA derives the SQL from the method name automatically.
     */
    List<Task> findByStatus(TaskStatus status);

}
