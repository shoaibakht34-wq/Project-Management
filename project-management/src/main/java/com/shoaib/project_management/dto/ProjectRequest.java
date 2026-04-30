package com.shoaib.project_management.dto;

import com.shoaib.project_management.entity.ProjectStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ProjectRequest {

    @NotBlank(message = "Project name is required")
    private String name;

    private String description;

    private LocalDate deadline;

    private ProjectStatus status;
}