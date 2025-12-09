package com.skillforge.backend.repository;

import com.skillforge.backend.entity.Material;
import com.skillforge.backend.entity.Topic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MaterialRepository extends JpaRepository<Material, Long> {

    List<Material> findByTopic(Topic topic);
}
