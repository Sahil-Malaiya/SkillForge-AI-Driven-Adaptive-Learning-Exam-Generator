package com.skillforge.backend.controller;

import com.skillforge.backend.config.JwtUtil;
import com.skillforge.backend.dto.*;
import com.skillforge.backend.entity.User;
import com.skillforge.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request) {
        User newUser = userService.registerUser(request);
        String token = jwtUtil.generateToken(newUser);
        return new AuthResponse(token, newUser.getRole().name());
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userService.findByEmail(request.getEmail());
        String token = jwtUtil.generateToken(user);

        return new AuthResponse(token, user.getRole().name());
    }
}
