package com.skillforge.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.skillforge.backend.entity.User;
import com.skillforge.backend.repository.UserRepository;

@Configuration
public class AdminStartupConfig {

    @Bean
    public CommandLineRunner createDefaultAdmin(UserRepository repo) {
        return args -> {
            if (!repo.existsByEmail("admin@gmail.com")) {
                BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

                User admin = new User();
                admin.setName("Admin User");
                admin.setEmail("admin@gmail.com");
                admin.setPassword(encoder.encode("@Sahil123"));
                admin.setRole(User.Role.ADMIN);

                repo.save(admin);
                System.out.println("Default Admin Created Successfully!");
            } else {
                System.out.println("Admin Already Exists! Skipping...");
            }
        };
    }
}
