package com.skillforge.backend.dto;

import lombok.Data;

@Data
public class MaterialRequest {
    private Long topicId;
    private String type;        // VIDEO / PDF / LINK
    private String url;
    private String difficulty;  // BEGINNER / INTERMEDIATE / ADVANCED
}
