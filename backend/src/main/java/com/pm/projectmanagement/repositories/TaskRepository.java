package com.pm.projectmanagement.repositories;

import com.pm.projectmanagement.enums.Priority;
import com.pm.projectmanagement.enums.ProjectStatus;
import com.pm.projectmanagement.enums.TaskStatus;
import com.pm.projectmanagement.models.Project;
import com.pm.projectmanagement.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByOrderByCreatedAtDesc();

    @Query("""
                SELECT t FROM Task t 
                JOIN t.assignedTo u 
                WHERE u.id = :userId 
                ORDER BY t.createdAt DESC
            """)
    List<Task> findAllTasksAssignedToUser(@Param("userId") Long userId);

    List<Task> findByStatusOrderByCreatedAtDesc(TaskStatus status);

    List<Task> findByPriorityOrderByCreatedAtDesc(Priority priority);

    List<Task> findByProjectId(Long projectId);
}
