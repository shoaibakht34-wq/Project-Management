package com.shoaib.project_management.service;

import com.shoaib.project_management.dto.TaskRequest;
import com.shoaib.project_management.dto.UpdateTaskStatusRequest;
import com.shoaib.project_management.entity.Project;
import com.shoaib.project_management.entity.Task;
import com.shoaib.project_management.entity.User;
import com.shoaib.project_management.entity.enums.TaskStatus;
import com.shoaib.project_management.repository.ProjectRepository;
import com.shoaib.project_management.repository.TaskRepository;
import com.shoaib.project_management.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public Task createTask(TaskRequest request) {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User admin = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));

        User assignedUser = userRepository.findById(request.getAssignedUserId())
                .orElseThrow(() -> new RuntimeException("Assigned user not found"));

        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .priority(request.getPriority())
                .dueDate(request.getDueDate())
                .status(TaskStatus.TODO)
                .project(project)
                .assignedTo(assignedUser)
                .createdBy(admin)
                .build();

        return taskRepository.save(task);
    }

    public List<Task> getMyTasks() {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return taskRepository.findByAssignedTo(user);
    }

    public Task updateTaskStatus(
            Long taskId,
            UpdateTaskStatusRequest request
    ) {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getAssignedTo().getId().equals(user.getId())) {
            throw new RuntimeException("You can only update your own tasks");
        }

        task.setStatus(request.getStatus());

        return taskRepository.save(task);
    }
}