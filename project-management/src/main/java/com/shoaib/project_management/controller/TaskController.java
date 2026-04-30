package com.shoaib.project_management.controller;

import com.shoaib.project_management.dto.TaskRequest;
import com.shoaib.project_management.dto.UpdateTaskStatusRequest;
import com.shoaib.project_management.entity.Task;
import com.shoaib.project_management.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Task> createTask(
            @Valid @RequestBody TaskRequest request
    ) {
        return ResponseEntity.ok(
                taskService.createTask(request)
        );
    }

    @GetMapping("/my-tasks")
    public ResponseEntity<List<Task>> getMyTasks() {
        return ResponseEntity.ok(
                taskService.getMyTasks()
        );
    }

    @PutMapping("/{taskId}/status")
    public ResponseEntity<Task> updateTaskStatus(
            @PathVariable Long taskId,
            @Valid @RequestBody UpdateTaskStatusRequest request
    ) {
        return ResponseEntity.ok(
                taskService.updateTaskStatus(taskId, request)
        );
    }
}