package com.shoaib.project_management.dto;

import com.shoaib.project_management.entity.enums.Priority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskRequest {

    @NotBlank
    private String title;

    private String description;

    @NotNull
    private Priority priority;

    @NotNull
    private LocalDate dueDate;

    @NotNull
    private Long projectId;

    @NotNull
    private Long assignedUserId;
}