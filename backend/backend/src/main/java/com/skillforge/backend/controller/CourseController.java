package com.skillforge.backend.controller;

import com.skillforge.backend.dto.CourseRequest;
import com.skillforge.backend.entity.Course;
import com.skillforge.backend.entity.User;
import com.skillforge.backend.repository.UserRepository;
import com.skillforge.backend.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
@CrossOrigin
public class CourseController {

    private final CourseService courseService;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName(); // username = email
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Instructor: create course
    @PostMapping
    public ResponseEntity<Course> createCourse(@RequestBody CourseRequest request) {
        User instructor = getCurrentUser();
        Course course = courseService.createCourse(instructor, request);
        return ResponseEntity.ok(course);
    }

    // Instructor: own courses
    @GetMapping("/instructor")
    public ResponseEntity<List<Course>> getInstructorCourses() {
        User instructor = getCurrentUser();
        return ResponseEntity.ok(courseService.getCoursesForInstructor(instructor));
    }

    // Student: all published courses
    @GetMapping
    public ResponseEntity<List<Course>> getPublishedCourses() {
        return ResponseEntity.ok(courseService.getPublishedCourses());
    }

    // Instructor: update course
    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable Long id,
                                               @RequestBody CourseRequest request) {
        User instructor = getCurrentUser();
        return ResponseEntity.ok(courseService.updateCourse(id, request, instructor));
    }

    // Instructor: delete course
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        User instructor = getCurrentUser();
        courseService.deleteCourse(id, instructor);
        return ResponseEntity.noContent().build();
    }
}
