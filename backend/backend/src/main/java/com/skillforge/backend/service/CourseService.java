package com.skillforge.backend.service;

import com.skillforge.backend.dto.CourseRequest;
import com.skillforge.backend.entity.Course;
import com.skillforge.backend.entity.User;
import com.skillforge.backend.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;

    public Course createCourse(User instructor, CourseRequest request) {
        Course course = new Course();
        course.setInstructor(instructor);
        course.setTitle(request.getTitle());
        course.setDescription(request.getDescription());
        course.setCategory(request.getCategory());
        course.setThumbnailUrl(request.getThumbnailUrl());

        if (request.getStatus() != null) {
            course.setStatus(Course.Status.valueOf(request.getStatus().toUpperCase()));
        }

        return courseRepository.save(course);
    }

    public List<Course> getCoursesForInstructor(User instructor) {
        return courseRepository.findByInstructor(instructor);
    }

    public List<Course> getPublishedCourses() {
        return courseRepository.findByStatus(Course.Status.PUBLISHED);
    }

    public Course updateCourse(Long id, CourseRequest request, User instructor) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        // ensure ownership
        if (!course.getInstructor().getId().equals(instructor.getId())) {
            throw new RuntimeException("Not allowed to update this course");
        }

        course.setTitle(request.getTitle());
        course.setDescription(request.getDescription());
        course.setCategory(request.getCategory());
        course.setThumbnailUrl(request.getThumbnailUrl());

        if (request.getStatus() != null) {
            course.setStatus(Course.Status.valueOf(request.getStatus().toUpperCase()));
        }

        return courseRepository.save(course);
    }

    public void deleteCourse(Long id, User instructor) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        if (!course.getInstructor().getId().equals(instructor.getId())) {
            throw new RuntimeException("Not allowed to delete this course");
        }

        courseRepository.delete(course);
    }
}
