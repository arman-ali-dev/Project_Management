package com.pm.projectmanagement.controllers.admin;

import com.pm.projectmanagement.enums.TaskStatus;
import com.pm.projectmanagement.models.Task;
import com.pm.projectmanagement.requests.CreateTaskRequest;
import com.pm.projectmanagement.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/tasks")
public class AdminTaskController {

    private final TaskService taskService;

    @Autowired
    public AdminTaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public ResponseEntity<Task> createTaskHandler(@RequestBody CreateTaskRequest request) {
        Task createdTask = taskService.createTask(request);
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTaskHandler(@PathVariable Long id, @RequestBody Task task) {
        Task updatedTask = taskService.updateTask(id, task);
        return new ResponseEntity<>(updatedTask, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTaskHandler(@PathVariable Long id) {
        taskService.deleteTask(id);
        return new ResponseEntity<>("Task Deleted", HttpStatus.OK);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Task> changeStatusHandler(@PathVariable Long id, @RequestParam TaskStatus status) {
        Task task = taskService.changeStatus(id, status);
        return new ResponseEntity<>(task, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Task>> changeStatusHandler() {
        List<Task> tasks = taskService.getAllTasks();
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }
}
