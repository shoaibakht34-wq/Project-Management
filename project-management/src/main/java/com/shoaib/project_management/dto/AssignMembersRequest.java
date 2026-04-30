package com.shoaib.project_management.dto;

import lombok.Data;

import java.util.Set;

@Data
public class AssignMembersRequest {

    private Set<Long> userIds;
}