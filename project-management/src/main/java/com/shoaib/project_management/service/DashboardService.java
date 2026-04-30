package com.shoaib.project_management.service;

import com.shoaib.project_management.dto.DashboardResponse;
import com.shoaib.project_management.entity.User;
import com.shoaib.project_management.entity.Role;
import com.shoaib.project_management.entity.enums.TaskStatus;
import com.shoaib.project_management.repository.ProjectRepository;
import com.shoaib.project_management.repository.TaskRepository;
import com.shoaib.project_management.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public DashboardResponse getDashboard() {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole() == Role.ADMIN) {

            return DashboardResponse.builder()
                    .totalProjects(projectRepository.count())
                    .totalTasks(taskRepository.count())
                    .completedTasks(
                            taskRepository.countByStatus(TaskStatus.DONE)
                    )
                    .pendingTasks(
                            taskRepository.countByStatusNot(TaskStatus.DONE)
                    )
                    .overdueTasks(
                            taskRepository.countByDueDateBeforeAndStatusNot(
                                    LocalDate.now(),
                                    TaskStatus.DONE
                            )
                    )
                    .totalMembers(
                            userRepository.countByRole(Role.MEMBER)
                    )
                    .build();
        }

        return DashboardResponse.builder()
                .totalProjects(
                        projectRepository.countByMembersContaining(user)
                )
                .totalTasks(
                        taskRepository.countByAssignedTo(user)
                )
                .completedTasks(
                        taskRepository.countByAssignedToAndStatus(
                                user,
                                TaskStatus.DONE
                        )
                )
                .pendingTasks(
                        taskRepository.countByAssignedToAndStatusNot(
                                user,
                                TaskStatus.DONE
                        )
                )
                .overdueTasks(
                        taskRepository
                                .countByAssignedToAndDueDateBeforeAndStatusNot(
                                        user,
                                        LocalDate.now(),
                                        TaskStatus.DONE
                                )
                )
                .totalMembers(0)
                .build();
    }
}