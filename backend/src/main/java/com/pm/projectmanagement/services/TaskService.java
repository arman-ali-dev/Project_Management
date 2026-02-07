package com.pm.projectmanagement.services;

import com.pm.projectmanagement.enums.TaskStatus;
import com.pm.projectmanagement.models.Task;
import com.pm.projectmanagement.requests.CreateTaskRequest;

import java.util.List;

public interface TaskService {
    Task createTask(CreateTaskRequest request);

    Task updateTask(Long id, Task task);

    Task getTask(Long id);

    void deleteTask(Long id);

    List<Task> getAllTasks();

    Task changeStatus(Long id, TaskStatus status);

    List<Task> getAllMyTasks(Long userId);
}
