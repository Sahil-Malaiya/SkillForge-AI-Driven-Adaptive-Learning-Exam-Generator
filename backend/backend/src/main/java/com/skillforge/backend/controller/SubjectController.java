package com.skillforge.backend.controller;

import com.skillforge.backend.dto.SubjectRequest;
import com.skillforge.backend.entity.Subject;
import com.skillforge.backend.entity.User;
import com.skillforge.backend.repository.UserRepository;
import com.skillforge.backend.service.SubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subjects")
@RequiredArgsConstructor
@CrossOrigin
public class SubjectController {

    private final SubjectService subjectService;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PostMapping
    public ResponseEntity<Subject> createSubject(@RequestBody SubjectRequest request) {
        User instructor = getCurrentUser();
        return ResponseEntity.ok(subjectService.createSubject(instructor, request));
    }

    @GetMapping("/by-course/{courseId}")
    public ResponseEntity<List<Subject>> getSubjectsByCourse(@PathVariable Long courseId) {
        return ResponseEntity.ok(subjectService.getSubjectsByCourse(courseId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Subject> updateSubject(@PathVariable Long id,
                                                 @RequestBody SubjectRequest request) {
        User instructor = getCurrentUser();
        return ResponseEntity.ok(subjectService.updateSubject(id, request, instructor));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubject(@PathVariable Long id) {
        User instructor = getCurrentUser();
        subjectService.deleteSubject(id, instructor);
        return ResponseEntity.noContent().build();
    }
}
