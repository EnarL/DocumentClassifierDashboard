package com.example.backend.unitTests;


import com.example.backend.classification.Classification;
import com.example.backend.classification.ClassificationDTO;
import com.example.backend.document.Document;
import com.example.backend.document.DocumentDTO;
import com.example.backend.document.DocumentRepository;
import com.example.backend.document.DocumentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class DocumentServiceTests {

    private DocumentRepository documentRepository;
    private DocumentService documentService;

    @BeforeEach
    void setUp() {
        documentRepository = mock(DocumentRepository.class);
        documentService = new DocumentService(documentRepository);
    }

    @Test
    void testAddClassifications() {
        DocumentDTO dto = new DocumentDTO(null, "Test Doc", List.of(
                new ClassificationDTO("Label1", 0.9),
                new ClassificationDTO("Label2", 0.8)
        ));

        documentService.addClassifications(List.of(dto));

        ArgumentCaptor<Document> captor = ArgumentCaptor.forClass(Document.class);
        verify(documentRepository, times(1)).save(captor.capture());

        Document saved = captor.getValue();
        assertEquals("Test Doc", saved.getTitle());
        assertEquals(2, saved.getClassifications().size());
    }

    @Test
    void testGetClassifications() {
        Document doc = new Document();
        doc.setId(1L);
        doc.setTitle("Sample");
        Classification c1 = new Classification();
        c1.setLabel("A");
        c1.setScore(0.7);
        c1.setDocument(doc);

        Classification c2 = new Classification();
        c2.setLabel("B");
        c2.setScore(0.6);
        c2.setDocument(doc);

        doc.setClassifications(List.of(c1, c2));

        when(documentRepository.findAll()).thenReturn(List.of(doc));

        List<DocumentDTO> result = documentService.getClassifications();
        assertEquals(1, result.size());
        assertEquals("Sample", result.get(0).title());
        assertEquals(2, result.get(0).classifications().size());
    }

    @Test
    void testUpdateClassifications_existingAndNew() {
        Document doc = new Document();
        doc.setId(1L);
        doc.setTitle("Update Test");

        Classification existing = new Classification();
        existing.setLabel("Exist");
        existing.setScore(0.5);
        existing.setDocument(doc);

        doc.setClassifications(new ArrayList<>(List.of(existing)));

        when(documentRepository.findById(1L)).thenReturn(Optional.of(doc));

        List<ClassificationDTO> updates = List.of(
                new ClassificationDTO("Exist", 0.9), // update score
                new ClassificationDTO("New", 0.8)   // add new
        );

        documentService.updateClassifications(1L, updates);

        assertEquals(2, doc.getClassifications().size());

        Optional<Classification> updated = doc.getClassifications().stream()
                .filter(c -> c.getLabel().equals("Exist"))
                .findFirst();
        assertTrue(updated.isPresent());
        assertEquals(0.9, updated.get().getScore());

        Optional<Classification> added = doc.getClassifications().stream()
                .filter(c -> c.getLabel().equals("New"))
                .findFirst();
        assertTrue(added.isPresent());
        assertEquals(0.8, added.get().getScore());

        verify(documentRepository).save(doc);
    }

    @Test
    void testUpdateClassifications_documentNotFound() {
        when(documentRepository.findById(1L)).thenReturn(Optional.empty());

        RuntimeException thrown = assertThrows(RuntimeException.class, () ->
                documentService.updateClassifications(1L, List.of(
                        new ClassificationDTO("A", 1.0)
                )));

        assertEquals("Document not found", thrown.getMessage());
    }
}

