package com.pm.projectmanagement.services.impl;

import com.pm.projectmanagement.enums.Priority;
import com.pm.projectmanagement.enums.TaskStatus;
import com.pm.projectmanagement.exceptions.NotFoundException;
import com.pm.projectmanagement.models.Document;
import com.pm.projectmanagement.models.Project;
import com.pm.projectmanagement.models.Task;
import com.pm.projectmanagement.repositories.TaskRepository;
import com.pm.projectmanagement.requests.CreateTaskRequest;
import com.pm.projectmanagement.services.ProjectService;
import com.pm.projectmanagement.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final ProjectService projectService;


    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository, ProjectService projectService) {
        this.taskRepository = taskRepository;
        this.projectService = projectService;
    }

    @Override
    public Task createTask(CreateTaskRequest request) {
        Task task = new Task();

        task.setTitle(request.getTitle());
        task.setCategory(request.getCategory());
        task.setDescription(request.getDescription());

        Project project = projectService.getProject(request.getProject());

        task.setProject(project);
        task.setStatus(request.getStatus() != null ? request.getStatus() : TaskStatus.TODO);
        task.setPriority(request.getPriority());
        task.setEstimatedTime(request.getEstimatedTime());
        task.setDueDate(request.getDueDate());
        task.setAssignedTo(request.getAssignedTo());

        for (Document document : request.getDocuments()) {
            document.setTask(task);
        }

        task.setSupportDocuments(request.getDocuments());

        return taskRepository.save(task);
    }

    @Override
    public Task updateTask(Long id, Task task) {
        Task existingTask = this.getTask(id);

        if (task.getTitle() != null && !task.getTitle().trim().isEmpty()) {
            existingTask.setTitle(task.getTitle());
        }

        if (task.getCategory() != null) {
            existingTask.setCategory(task.getCategory());
        }

        if (task.getDescription() != null && !task.getDescription().trim().isEmpty()) {
            existingTask.setDescription(task.getDescription());
        }

        if (task.getProject() != null) {
            existingTask.setProject(task.getProject());
        }

        if (task.getPriority() != null) {
            existingTask.setPriority(task.getPriority());
        }

        if (task.getDueDate() != null) {
            existingTask.setDueDate(task.getDueDate());
        }

        if (task.getAssignedTo() != null && !task.getAssignedTo().isEmpty()) {
            existingTask.setAssignedTo(task.getAssignedTo());
        }

        if (task.getSupportDocuments() != null && !task.getSupportDocuments().isEmpty()) {
            existingTask.setSupportDocuments(task.getSupportDocuments());
        }

        if (task.getEstimatedTime() != null) {
            existingTask.setEstimatedTime(task.getEstimatedTime());
        }

        if (task.getLabels() != null && !task.getLabels().isEmpty()) {
            existingTask.setLabels(task.getLabels());
        }

        return taskRepository.save(existingTask);
    }

    @Override
    public Task getTask(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Task not found with id: " + id));
    }

    @Override
    public void deleteTask(Long id) {
        Task task = this.getTask(id);
        taskRepository.delete(task);
    }

    @Override
    public List<Task> getAllTasks() {
        return taskRepository.findAllByOrderByCreatedAtDesc();
    }

    @Override
    public Task changeStatus(Long id, TaskStatus status) {
        Task task = this.getTask(id);
        task.setStatus(status);
        return taskRepository.save(task);
    }

    @Override
    public List<Task> getAllMyTasks(Long userId) {
        return taskRepository.findAllTasksAssignedToUser(userId);
    }

    @Override
    public List<Task> filterTasks(TaskStatus status, Priority priority) {
        if (status != null) {
            return taskRepository
                    .findByStatusOrderByCreatedAtDesc(status);
        }

        if (priority != null) {
            return taskRepository
                    .findByPriorityOrderByCreatedAtDesc(priority);
        }

        return taskRepository.findAll(
                Sort.by(Sort.Direction.DESC, "createdAt")
        );
    }

    @Override
    public List<Task> getTasksByProject(Long projectId) {
        return taskRepository.findByProjectId(projectId);
    }
}
