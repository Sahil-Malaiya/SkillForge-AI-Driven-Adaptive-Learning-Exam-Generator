package com.skillforge.backend.controller;

import com.skillforge.backend.dto.MaterialRequest;
import com.skillforge.backend.entity.Material;
import com.skillforge.backend.entity.User;
import com.skillforge.backend.repository.UserRepository;
import com.skillforge.backend.service.MaterialService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/materials")
@RequiredArgsConstructor
@CrossOrigin
public class MaterialController {

    private final MaterialService materialService;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PostMapping
    public ResponseEntity<Material> createMaterial(@RequestBody MaterialRequest request) {
        User instructor = getCurrentUser();
        return ResponseEntity.ok(materialService.createMaterial(instructor, request));
    }

    @GetMapping("/by-topic/{topicId}")
    public ResponseEntity<List<Material>> getMaterialsByTopic(@PathVariable Long topicId) {
        return ResponseEntity.ok(materialService.getMaterialsByTopic(topicId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Material> updateMaterial(@PathVariable Long id,
                                                   @RequestBody MaterialRequest request) {
        User instructor = getCurrentUser();
        return ResponseEntity.ok(materialService.updateMaterial(id, request, instructor));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMaterial(@PathVariable Long id) {
        User instructor = getCurrentUser();
        materialService.deleteMaterial(id, instructor);
        return ResponseEntity.noContent().build();
    }
}
