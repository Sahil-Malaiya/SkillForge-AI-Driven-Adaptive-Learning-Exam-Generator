package com.skillforge.backend.repository;

import com.skillforge.backend.entity.Course;
import com.skillforge.backend.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubjectRepository extends JpaRepository<Subject, Long> {

    List<Subject> findByCourse(Course course);
}
