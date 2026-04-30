package com.shoaib.project_management.repository;

import com.shoaib.project_management.entity.Project;
import com.shoaib.project_management.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
        long countByMembersContaining(User user);
}