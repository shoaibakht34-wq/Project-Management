package com.shoaib.project_management.repository;

import com.shoaib.project_management.entity.Task;
import com.shoaib.project_management.entity.User;
import com.shoaib.project_management.entity.enums.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByAssignedTo(User user);

    List<Task> findByStatus(TaskStatus status);

    List<Task> findByDueDateBeforeAndStatusNot(
            LocalDate date,
            TaskStatus status
    );
    long countByStatus(TaskStatus status);

long countByStatusNot(TaskStatus status);

long countByDueDateBeforeAndStatusNot(
        LocalDate date,
        TaskStatus status
);

long countByAssignedTo(User user);

long countByAssignedToAndStatus(User user, TaskStatus status);

long countByAssignedToAndStatusNot(User user, TaskStatus status);

long countByAssignedToAndDueDateBeforeAndStatusNot(
        User user,
        LocalDate date,
        TaskStatus status
);
}