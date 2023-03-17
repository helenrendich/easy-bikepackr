package com.example.backend.controller;

import com.example.backend.model.Checklist;
import com.example.backend.repository.ChecklistRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.time.LocalDate;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ChecklistControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ChecklistRepository checklistRepository;

    Checklist testChecklist = new Checklist("testId", "testDestination", LocalDate.of(2024, 1, 8));

    @Nested
    @DisplayName("GET All /api/easy-bikepackr/lists")
    class testGetAllChecklists {

        @Test
        @DisplayName("...should return an empty array if there are no checklists in the database")
        void testGetAllChecklists_emptyArray() throws Exception {
            mockMvc.perform(MockMvcRequestBuilders.get("/api/easy-bikepackr/lists/"))
                    .andExpect(status().isOk())
                    .andExpect(content().json("[]"));
        }
    }

}