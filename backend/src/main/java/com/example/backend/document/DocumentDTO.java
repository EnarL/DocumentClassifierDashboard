package com.example.backend.document;

import com.example.backend.classification.ClassificationDTO;

import java.util.List;

public record DocumentDTO(
        Long id,
    String title,
    List<ClassificationDTO> classifications
) {
}
