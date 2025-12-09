package com.skillforge.backend.repository;

import com.skillforge.backend.entity.Course;
import com.skillforge.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findByInstructor(User instructor);

    List<Course> findByStatus(Course.Status status);
}
