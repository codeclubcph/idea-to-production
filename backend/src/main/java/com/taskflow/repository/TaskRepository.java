package com.taskflow.repository;

import com.taskflow.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

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

    // TODO [Checkpoint 1]: Add custom finder methods below
    //
    // Example:
    //   List<Task> findByStatus(TaskStatus status);
    //   List<Task> findByTitleContainingIgnoreCase(String keyword);

}
