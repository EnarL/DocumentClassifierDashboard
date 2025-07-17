package com.example.backend.document;

import com.example.backend.classification.ClassificationDTO;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record DocumentDTO(
        Long id,
        @JsonProperty("document_name")
    String title,
    List<ClassificationDTO> classifications
) {
}
