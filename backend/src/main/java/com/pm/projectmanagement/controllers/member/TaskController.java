package com.pm.projectmanagement.controllers.member;

import com.pm.projectmanagement.enums.TaskStatus;
import com.pm.projectmanagement.models.Task;
import com.pm.projectmanagement.models.User;
import com.pm.projectmanagement.services.TaskService;
import com.pm.projectmanagement.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;
    private final UserService userService;

    @Autowired
    public TaskController(TaskService taskService, UserService userService) {
        this.taskService = taskService;
        this.userService = userService;
    }

    @GetMapping("/my")
    public ResponseEntity<List<Task>> getAllMyTasksHandler(@RequestHeader("Authorization") String jwt) {
        User user = userService.getUserProfile(jwt);
        List<Task> tasks = taskService.getAllMyTasks(user.getId());
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Task> changeStatusHandler(@PathVariable Long id, @RequestParam TaskStatus status) {
        Task task = taskService.changeStatus(id, status);
        return new ResponseEntity<>(task, HttpStatus.OK);
    }

    @GetMapping("/projects/{projectId}")
    public ResponseEntity<List<Task>> getTasksByProject(@PathVariable Long projectId) {
        List<Task> tasks = taskService.getTasksByProject(projectId);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

}
