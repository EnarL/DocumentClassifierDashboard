package com.example.backend.classification;

public record ClassificationDTO(
    String label,
    double score
) {
}
