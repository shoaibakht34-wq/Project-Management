package com.shoaib.project_management.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {

    private long totalProjects;

    private long totalTasks;

    private long completedTasks;

    private long pendingTasks;

    private long overdueTasks;

    private long totalMembers;
}