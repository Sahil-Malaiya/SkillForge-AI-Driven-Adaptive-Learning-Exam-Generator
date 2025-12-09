package com.skillforge.backend.service;

import com.skillforge.backend.dto.SubjectRequest;
import com.skillforge.backend.entity.Course;
import com.skillforge.backend.entity.Subject;
import com.skillforge.backend.entity.User;
import com.skillforge.backend.repository.CourseRepository;
import com.skillforge.backend.repository.SubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SubjectService {

    private final SubjectRepository subjectRepository;
    private final CourseRepository courseRepository;

    public Subject createSubject(User instructor, SubjectRequest request) {
        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        if (!course.getInstructor().getId().equals(instructor.getId())) {
            throw new RuntimeException("Not allowed to add subject to this course");
        }

        Subject subject = new Subject();
        subject.setCourse(course);
        subject.setName(request.getName());

        return subjectRepository.save(subject);
    }

    public List<Subject> getSubjectsByCourse(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        return subjectRepository.findByCourse(course);
    }

    public Subject updateSubject(Long id, SubjectRequest request, User instructor) {
        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        if (!subject.getCourse().getInstructor().getId().equals(instructor.getId())) {
            throw new RuntimeException("Not allowed to update this subject");
        }

        subject.setName(request.getName());
        return subjectRepository.save(subject);
    }

    public void deleteSubject(Long id, User instructor) {
        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        if (!subject.getCourse().getInstructor().getId().equals(instructor.getId())) {
            throw new RuntimeException("Not allowed to delete this subject");
        }

        subjectRepository.delete(subject);
    }
}
