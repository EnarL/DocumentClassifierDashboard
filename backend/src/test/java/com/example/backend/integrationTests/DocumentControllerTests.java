package com.example.backend.integrationTests;

import com.example.backend.classification.ClassificationDTO;
import com.example.backend.document.DocumentController;
import com.example.backend.document.DocumentDTO;
import com.example.backend.document.DocumentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(DocumentController.class)
public class DocumentControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private DocumentService documentService;

    @Test
    void testAddClassifications() throws Exception {
        doNothing().when(documentService).addClassifications(any());

        String jsonPayload = """
            [
                {
                    "id": 1,
                    "title": "Doc 1",
                    "classifications": []
                }
            ]
            """;

        mockMvc.perform(post("/api/classifications")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonPayload))
                .andExpect(status().isCreated());

        verify(documentService).addClassifications(any());
    }

    @Test
    void testGetClassifications() throws Exception {
        ClassificationDTO classification = new ClassificationDTO("label1", 0.8);
        DocumentDTO doc = new DocumentDTO(1L, "Doc 1", List.of(classification));

        when(documentService.getClassifications()).thenReturn(List.of(doc));

        mockMvc.perform(get("/api/classifications"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].title").value("Doc 1"))
                .andExpect(jsonPath("$[0].classifications[0].label").value("label1"))
                .andExpect(jsonPath("$[0].classifications[0].score").value(0.8));

        verify(documentService).getClassifications();
    }

    @Test
    void testUpdateClassifications() throws Exception {
        doNothing().when(documentService).updateClassifications(eq(1L), any());

        String jsonPayload = """
            [
                {
                    "label": "label1",
                    "score": 0.8
                }
            ]
            """;

        mockMvc.perform(patch("/api/classifications/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonPayload))
                .andExpect(status().isNoContent());

        verify(documentService).updateClassifications(eq(1L), any());
    }
}