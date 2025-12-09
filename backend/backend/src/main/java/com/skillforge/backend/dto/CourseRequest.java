package com.skillforge.backend.dto;

import lombok.Data;

@Data
public class CourseRequest {
    private String title;
    private String description;
    private String category;
    private String thumbnailUrl;
    private String status; // "PUBLISHED" / "DRAFT" (optional)
}
