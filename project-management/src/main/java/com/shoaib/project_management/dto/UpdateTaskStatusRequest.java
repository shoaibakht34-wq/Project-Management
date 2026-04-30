package com.shoaib.project_management.dto;

import com.shoaib.project_management.entity.enums.TaskStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateTaskStatusRequest {

    @NotNull
    private TaskStatus status;
}