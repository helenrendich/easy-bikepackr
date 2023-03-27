package com.example.backend.controller;

import com.example.backend.model.Checklist;
import com.example.backend.repository.ChecklistRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class ChecklistControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ChecklistRepository checklistRepository;

    String testId = "Some test ID";
    String testDestination = "testDestination";
    LocalDate testLocalDate = LocalDate.of(2024, 1, 8);

    Checklist testChecklist = new Checklist(testId, testDestination, testLocalDate);


    @Nested
    @DisplayName("GET All /api/easy-bikepackr/lists")
    class testGetAllChecklists {

        @Test
        @DisplayName("...should return an empty array if there are no checklists in the database")
        void testGetAllChecklists_emptyArray() throws Exception {
            mockMvc.perform(get("/api/easy-bikepackr/lists"))
                    .andExpect(status().isOk())
                    .andExpect(content().json("[]"));
        }

        @Test
        @DirtiesContext
        @DisplayName("...should return all checklists if the database is not empty")
        void testGetAllChecklists_returnsAllChecklists_databaseNotEmpty() throws Exception {
            checklistRepository.save(testChecklist);
            mockMvc.perform(get("/api/easy-bikepackr/lists"))
                    .andExpect(status().isOk())
                    .andExpect(content().json("""
                            [{
                                    "id": "Some test ID",
                                    "destination": "testDestination",
                                    "startDate": "2024-01-08"
                                }]
                            """));
        }
    }

    @Nested
    @DisplayName("POST /api/easy-bikepackr/lists")
    class testAddChecklist {

        @Test
        @DirtiesContext
        @DisplayName("...should add a checklist to the database and return it")
        void addChecklist_returnsAChecklist() throws Exception {
            mockMvc.perform(post("/api/easy-bikepackr/lists")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("""
                                    {
                                        "destination": "testDestination",
                                        "startDate": "2024-01-08"
                                    }
                                    """))
                    .andExpect(status().isCreated())
                    .andExpect(content().json("""
                            {
                                "destination": "testDestination",
                                "startDate": "2024-01-08"
                            }
                            """))
                    .andExpect(jsonPath("$.id").isNotEmpty());
        }
    }

    @Nested
    @DisplayName("DELETE /api/easy-bikepackr/lists/{id}")
    class testDeleteChecklist {

        @Test
        @DirtiesContext
        @DisplayName("...should delete the checklist with the given id if it does exist in the database")
        void deleteChecklist_deletesAChecklistIfTheChecklistWithTheGivenIdDoesExist() throws Exception {
            checklistRepository.save(testChecklist);
            mockMvc.perform(delete("/api/easy-bikepackr/lists/" + testChecklist.id()))
                    .andExpect(status().isOk())
                    .andExpect(content().json("""
                                    {
                                       "id": "Some test ID",
                                       "destination": "testDestination",
                                       "startDate": "2024-01-08"
                                    }
                            """));
        }

        @Test
        @DirtiesContext
        @DisplayName("...should throw an exception if the checklist with the given id does not exist")
        void deleteChecklist_throwsExceptionIfTheChecklistWithTheGivenIdDoesNotExist() throws Exception {
            mockMvc.perform(delete("/api/easy-bikepackr/lists/41"))
                    .andExpect(status().isNotFound());
        }
    }

    @Nested
    @DisplayName("GET /api/easy-bikepackr/lists/{id}")
    class testGetChecklistById {

        @Test
        @DisplayName("...should throw an exception if the checklist with the given id does not exist in the database")
        void testGetChecklistById_throwsException() throws Exception {
            mockMvc.perform(get("/api/easy-bikepackr/lists/41"))
                    .andExpect(status().isNotFound());
        }

        @Test
        @DirtiesContext
        @DisplayName("...should return a checklist if the checklist with the given id does exist")
        void testGetChecklistById_IdExists() throws Exception {
            //GIVEN
            checklistRepository.save(testChecklist);

            //WHEN + THEN
            mockMvc.perform(get("/api/easy-bikepackr/lists/" + testChecklist.id()))
                    .andExpect(status().isOk())
                    .andExpect(content().json("""
                                    {
                                                            "id": "Some test ID",
                                                            "destination": "testDestination",
                                                            "startDate": "2024-01-08"
                                                         }
                            """));
        }
    }
}
