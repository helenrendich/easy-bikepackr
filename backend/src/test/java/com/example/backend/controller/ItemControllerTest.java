package com.example.backend.controller;

import com.example.backend.model.Checklist;
import com.example.backend.model.Item;
import com.example.backend.repository.ChecklistRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ItemControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ChecklistRepository checklistRepository;

    String testId = "Some test ID";
    String testDestination = "testDestination";
    LocalDate testLocalDate = LocalDate.of(2024, 1, 8);
    Item testItem = new Item("ItemTestId", "Helmet", false, "Bike Gear");
    List<Item> testItems = List.of(testItem);

    Checklist testChecklist = new Checklist(testId, testDestination, testLocalDate, testItems);

    @Nested
    @DisplayName("PUT /api/easy-bikepackr/lists/{listId}/items")
    class testPutChecklist {
        @Test
        @DisplayName("...should update the item in a specific checklist and return the item")
        void updateItem_returnsAItemIfThereAreItemAndChecklistWitGivenIds() throws Exception {
            //GIVEN
            checklistRepository.save(testChecklist);
            //WHEN + THEN
            mockMvc.perform(put("/api/easy-bikepackr/lists/" + testChecklist.id() + "/items")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("""
                                    {
                                                                                                   "id": "ItemTestId",
                                                                                                   "title": "Helmet",
                                                                                                   "isTickedOff": true,
                                                                                                   "category": "Bike Gear"
                                                                                                   }

                                    """))
                    .andExpect(status().isOk())
                    .andExpect(content().json("""
                            {
                                                                                           "id": "ItemTestId",
                                                                                           "title": "Helmet",
                                                                                           "isTickedOff": true,
                                                                                           "category": "Bike Gear"
                                                                                           }
                            """));
        }
    }
}
