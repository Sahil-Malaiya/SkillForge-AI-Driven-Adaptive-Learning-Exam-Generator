package com.skillforge.backend.service;

import com.skillforge.backend.dto.MaterialRequest;
import com.skillforge.backend.entity.Material;
import com.skillforge.backend.entity.Topic;
import com.skillforge.backend.entity.User;
import com.skillforge.backend.repository.MaterialRepository;
import com.skillforge.backend.repository.TopicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MaterialService {

    private final MaterialRepository materialRepository;
    private final TopicRepository topicRepository;

    public Material createMaterial(User instructor, MaterialRequest request) {
        Topic topic = topicRepository.findById(request.getTopicId())
                .orElseThrow(() -> new RuntimeException("Topic not found"));

        // ownership check
        if (!topic.getSubject().getCourse().getInstructor().getId().equals(instructor.getId())) {
            throw new RuntimeException("Not allowed to add material to this topic");
        }

        Material material = new Material();
        material.setTopic(topic);
        material.setUrl(request.getUrl());
        material.setType(Material.Type.valueOf(request.getType().toUpperCase()));

        if (request.getDifficulty() != null) {
            material.setDifficulty(Material.Difficulty.valueOf(request.getDifficulty().toUpperCase()));
        }

        return materialRepository.save(material);
    }

    public List<Material> getMaterialsByTopic(Long topicId) {
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new RuntimeException("Topic not found"));

        return materialRepository.findByTopic(topic);
    }

    public Material updateMaterial(Long id, MaterialRequest request, User instructor) {
        Material material = materialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Material not found"));

        if (!material.getTopic().getSubject().getCourse().getInstructor().getId().equals(instructor.getId())) {
            throw new RuntimeException("Not allowed to update this material");
        }

        material.setUrl(request.getUrl());
        material.setType(Material.Type.valueOf(request.getType().toUpperCase()));

        if (request.getDifficulty() != null) {
            material.setDifficulty(Material.Difficulty.valueOf(request.getDifficulty().toUpperCase()));
        }

        return materialRepository.save(material);
    }

    public void deleteMaterial(Long id, User instructor) {
        Material material = materialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Material not found"));

        if (!material.getTopic().getSubject().getCourse().getInstructor().getId().equals(instructor.getId())) {
            throw new RuntimeException("Not allowed to delete this material");
        }

        materialRepository.delete(material);
    }
}
