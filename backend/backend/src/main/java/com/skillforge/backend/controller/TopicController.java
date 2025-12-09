package com.skillforge.backend.controller;

import com.skillforge.backend.dto.TopicRequest;
import com.skillforge.backend.entity.Topic;
import com.skillforge.backend.entity.User;
import com.skillforge.backend.repository.UserRepository;
import com.skillforge.backend.service.TopicService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/topics")
@RequiredArgsConstructor
@CrossOrigin
public class TopicController {

    private final TopicService topicService;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PostMapping
    public ResponseEntity<Topic> createTopic(@RequestBody TopicRequest request) {
        User instructor = getCurrentUser();
        return ResponseEntity.ok(topicService.createTopic(instructor, request));
    }

    @GetMapping("/by-subject/{subjectId}")
    public ResponseEntity<List<Topic>> getTopicsBySubject(@PathVariable Long subjectId) {
        return ResponseEntity.ok(topicService.getTopicsBySubject(subjectId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Topic> updateTopic(@PathVariable Long id,
                                             @RequestBody TopicRequest request) {
        User instructor = getCurrentUser();
        return ResponseEntity.ok(topicService.updateTopic(id, request, instructor));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTopic(@PathVariable Long id) {
        User instructor = getCurrentUser();
        topicService.deleteTopic(id, instructor);
        return ResponseEntity.noContent().build();
    }
}
