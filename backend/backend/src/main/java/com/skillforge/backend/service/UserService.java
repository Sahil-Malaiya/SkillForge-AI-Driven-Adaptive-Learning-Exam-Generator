package com.skillforge.backend.service;

import com.skillforge.backend.dto.RegisterRequest;
import com.skillforge.backend.entity.User;
import com.skillforge.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(RegisterRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(User.Role.valueOf(request.getRole().toUpperCase()));

        return repo.save(user);
    }

    public User findByEmail(String email) {
        return repo.findByEmail(email).orElse(null);
    }
}
