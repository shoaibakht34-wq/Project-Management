package com.shoaib.project_management.service;

import com.shoaib.project_management.dto.ProjectRequest;
import com.shoaib.project_management.entity.Project;
import com.shoaib.project_management.entity.User;
import com.shoaib.project_management.repository.ProjectRepository;
import com.shoaib.project_management.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.shoaib.project_management.dto.AssignMembersRequest;
import java.util.HashSet;
import java.util.Set;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public Project createProject(ProjectRequest request) {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User admin = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Project project = Project.builder()
                .name(request.getName())
                .description(request.getDescription())
                .deadline(request.getDeadline())
                .status(request.getStatus())
                .createdBy(admin)
                .build();

        return projectRepository.save(project);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }
    public Project assignMembers(Long projectId, AssignMembersRequest request) {

    Project project = projectRepository.findById(projectId)
            .orElseThrow(() -> new RuntimeException("Project not found"));

    Set<User> members = new HashSet<>();

    for (Long userId : request.getUserIds()) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        members.add(user);
    }

    project.setMembers(members);

    return projectRepository.save(project);
}
    public List<Project> getMyProjects() {

    String email = SecurityContextHolder.getContext()
            .getAuthentication()
            .getName();

    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    return projectRepository.findAll()
            .stream()
            .filter(project ->
                    project.getMembers() != null &&
                    project.getMembers().contains(user))
            .toList();
}
}