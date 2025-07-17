package com.example.backend.document;

import com.example.backend.classification.Classification;
import com.example.backend.classification.ClassificationDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DocumentService {

    private final DocumentRepository documentRepository;

    public DocumentService(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    @Transactional
    public void addClassifications(List<DocumentDTO> documentInputDTOs) {
        for (DocumentDTO dto : documentInputDTOs) {
            Document document = new Document();
            document.setTitle(dto.title());

            List<Classification> classificationList = dto.classifications().stream().map(cdto -> {
                Classification classification = new Classification();
                classification.setLabel(cdto.label());
                classification.setScore(cdto.score());
                classification.setDocument(document);
                return classification;
            }).toList();

            document.setClassifications(classificationList);
            documentRepository.save(document);
        }
    }
    public List<DocumentDTO> getClassifications() {
        return documentRepository.findAll().stream()
                .map(document -> new DocumentDTO(
                        document.getId(),
                        document.getTitle(),
                        document.getClassifications().stream()
                                .map(classification -> new ClassificationDTO(
                                        classification.getLabel(),
                                        classification.getScore()))
                                .toList()))
                .toList();
    }

    public void updateClassifications(Long documentId, List<ClassificationDTO> updatedClassifications) {
        Document document = documentRepository.findById(documentId)
                .orElseThrow(() -> new RuntimeException("Document not found"));
        Map<String, Classification> existingMap = document.getClassifications().stream()
                .collect(Collectors.toMap(Classification::getLabel, c -> c));

        for (ClassificationDTO updated : updatedClassifications) {
            Classification existing = existingMap.get(updated.label());
            if (existing != null) {
                existing.setScore(updated.score());
            } else {
                Classification newClassification = new Classification();
                newClassification.setLabel(updated.label());
                newClassification.setScore(updated.score());
                newClassification.setDocument(document);
                document.getClassifications().add(newClassification);
            }
        }

        documentRepository.save(document);
    }





}
