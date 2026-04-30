package com.shoaib.project_management.dto;

import com.shoaib.project_management.entity.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;
 
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    private Role role;
}