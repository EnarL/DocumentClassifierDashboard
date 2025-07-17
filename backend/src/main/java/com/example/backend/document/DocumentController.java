package com.example.backend.document;

import com.example.backend.classification.ClassificationDTO;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }
    @PostMapping("/classifications")
    public void addClassifications(@RequestBody List<DocumentDTO> documentInputDTOs) {
        documentService.addClassifications(documentInputDTOs);
    }
    @GetMapping("/classifications")
    public List<DocumentDTO> getClassifications() {
        return documentService.getClassifications();
    }
    @PatchMapping("/classifications/{id}")
    public void updateClassifications(@PathVariable Long id, @RequestBody List<ClassificationDTO> updatedClassifications) {
        documentService.updateClassifications(id, updatedClassifications);
    }


}
