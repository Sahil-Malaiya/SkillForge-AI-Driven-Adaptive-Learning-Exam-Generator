package com.skillforge.backend.service;

import com.skillforge.backend.dto.TopicRequest;
import com.skillforge.backend.entity.Subject;
import com.skillforge.backend.entity.Topic;
import com.skillforge.backend.entity.User;
import com.skillforge.backend.repository.SubjectRepository;
import com.skillforge.backend.repository.TopicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TopicService {

    private final TopicRepository topicRepository;
    private final SubjectRepository subjectRepository;

    public Topic createTopic(User instructor, TopicRequest request) {
        Subject subject = subjectRepository.findById(request.getSubjectId())
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        if (!subject.getCourse().getInstructor().getId().equals(instructor.getId())) {
            throw new RuntimeException("Not allowed to add topic to this subject");
        }

        Topic topic = new Topic();
        topic.setSubject(subject);
        topic.setName(request.getName());

        return topicRepository.save(topic);
    }

    public List<Topic> getTopicsBySubject(Long subjectId) {
        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        return topicRepository.findBySubject(subject);
    }

    public Topic updateTopic(Long id, TopicRequest request, User instructor) {
        Topic topic = topicRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Topic not found"));

        if (!topic.getSubject().getCourse().getInstructor().getId().equals(instructor.getId())) {
            throw new RuntimeException("Not allowed to update this topic");
        }

        topic.setName(request.getName());
        return topicRepository.save(topic);
    }

    public void deleteTopic(Long id, User instructor) {
        Topic topic = topicRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Topic not found"));

        if (!topic.getSubject().getCourse().getInstructor().getId().equals(instructor.getId())) {
            throw new RuntimeException("Not allowed to delete this topic");
        }

        topicRepository.delete(topic);
    }
}
