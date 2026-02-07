package com.pm.projectmanagement.repositories;

import com.pm.projectmanagement.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByOrderByCreatedAtDesc();

    @Query("""
                SELECT t 
                FROM Task t 
                JOIN t.assignedTo u 
                WHERE u.id = :userId 
                ORDER BY t.createdAt DESC
            """)
    List<Task> findAllTasksAssignedToUser(@Param("userId") Long userId);
}
