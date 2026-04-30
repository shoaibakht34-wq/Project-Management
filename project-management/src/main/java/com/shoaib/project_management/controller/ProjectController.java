package com.shoaib.project_management.controller;

import com.shoaib.project_management.dto.ProjectRequest;
import com.shoaib.project_management.entity.Project;
import com.shoaib.project_management.dto.AssignMembersRequest;
import com.shoaib.project_management.service.ProjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Project> createProject(
            @Valid @RequestBody ProjectRequest request
    ) {
        return ResponseEntity.ok(projectService.createProject(request));
    }

    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }
@PutMapping("/{projectId}/assign-members")
@PreAuthorize("hasRole('ADMIN')")
public ResponseEntity<Project> assignMembers(
        @PathVariable Long projectId,
        @RequestBody AssignMembersRequest request
) {
    return ResponseEntity.ok(
            projectService.assignMembers(projectId, request)
    );
}

@GetMapping("/my-projects")
public ResponseEntity<List<Project>> getMyProjects() {
    return ResponseEntity.ok(projectService.getMyProjects());
}
}