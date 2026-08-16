package com.rit.component;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(

        @NotBlank(message = "Full name is required")
        String name,

        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email")
        String email,

        @NotBlank(message = "Mobile number is required")
        String mobile,

        @NotBlank(message = "Password is required")
        @Size(min = 4, message = "Password must contain at least 4 characters")
        String password,

        @NotBlank(message = "Role is required")
        String role
) {
}