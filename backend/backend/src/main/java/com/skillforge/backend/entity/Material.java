package com.skillforge.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "materials")
public class Material {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id", nullable = false)
    private Topic topic;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Type type;    // VIDEO / PDF / LINK

    @Column(nullable = false, length = 500)
    private String url;

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty; // BEGINNER / INTERMEDIATE / ADVANCED

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
        if (difficulty == null) {
            difficulty = Difficulty.BEGINNER;
        }
    }

    public enum Type {
        VIDEO, PDF, LINK
    }

    public enum Difficulty {
        BEGINNER, INTERMEDIATE, ADVANCED
    }
}
