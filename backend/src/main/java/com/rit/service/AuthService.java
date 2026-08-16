package com.rit.service;

import org.springframework.stereotype.Service;

import com.rit.component.LoginRequest;
import com.rit.component.RegisterRequest;
import com.rit.entity.User;
import com.rit.repository.UserRepository;
import com.rit.util.Role;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.email())) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();

        user.setName(request.name());
        user.setEmail(request.email());
        user.setMobile(request.mobile());
        user.setPassword(request.password());

        user.setRole(
            Role.valueOf(request.role().toUpperCase())
        );

        return userRepository.save(user);
    }

    public User login(LoginRequest request) {

        User user = userRepository
                .findByEmail(request.email())
                .orElseThrow(() ->
                    new RuntimeException("Invalid email or password"));

        if (!user.getPassword().equals(request.password())) {
            throw new RuntimeException("Invalid email or password");
        }

        if (!user.getRole().name()
                .equalsIgnoreCase(request.role())) {

            throw new RuntimeException("Incorrect login role");
        }

        System.out.println("user"+user.getRole()+"login");
        return user;
    }
}