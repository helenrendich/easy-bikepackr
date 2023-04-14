package com.example.backend.service;

import com.example.backend.model.Checklist;
import com.example.backend.model.Item;
import com.example.backend.model.ItemDTO;
import com.example.backend.repository.ChecklistRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.time.LocalDate;
import java.util.List;


@SpringBootTest
class ItemServiceTest {

    @Autowired
    ChecklistRepository checklistRepository;
    @Autowired
    ItemService itemService;
    String testListId = "Some test ID";
    String testDestination = "testDestination";
    LocalDate testLocalDate = LocalDate.of(2024, 1, 8);
    Item testItem = new Item("ItemTestId", "Helmet", false, "Bike Gear");
    ItemDTO testItemToUpdate = new ItemDTO("ItemTestId", "Helmet", true, "Bike Gear");
    Item testItemUpdated = new Item("ItemTestId", "Helmet", true, "Bike Gear");
    ItemDTO testItemToUpdateWithNonExistingID = new ItemDTO("ItemFalseId", "Helmet", true, "Bike Gear");
    List<Item> testItems = List.of(testItem);
    List<Item> testItemsUpdated = List.of(testItemUpdated);
    Checklist testChecklist = new Checklist(testListId, testDestination, testLocalDate, testItems, false);

    @Nested
    @DisplayName("testing updateItem()")
    class updateItemTest {
        @Test
        @DisplayName("...throws an exception if the checklist with the given id does not exist")
        void updateItem_throwsExceptionIfTheChecklistWithTheGivenIdDoesNotExist() {
            //GIVEN
            Class<NoSuchChecklistException> expected = NoSuchChecklistException.class;
            //WHEN+THEN
            Assertions.assertThrows(expected, () -> itemService.updateItem(testListId, testItemToUpdate));
        }

        @Test
        @DirtiesContext
        @DisplayName("...throws an exception if the item in a specific checklist with the given item-id does not exist")
        void updateItem_throwsExceptionIfTheItemWithTheGivenIdDoesNotExist() {
            //GIVEN
            checklistRepository.save(testChecklist);
            Class<NoSuchItemException> expected = NoSuchItemException.class;
            //WHEN+THEN
            Assertions.assertThrows(expected, () -> itemService.updateItem(testListId, testItemToUpdateWithNonExistingID));
        }

        @Test
        @DirtiesContext
        @DisplayName("...updates an existing item in an existing checklist if the checklist with the given id and" +
                "the item with the given id do exist in the database")
        void updateItem_updatesItemInASpecificChecklistInTheDatabase() {
            //GIVEN
            checklistRepository.save(testChecklist);
            Checklist expected = new Checklist(testChecklist.id(), testChecklist.destination(), testChecklist.startDate(), testItemsUpdated, false);
            //WHEN
            Checklist actual = itemService.updateItem(testChecklist.id(), testItemToUpdate);
            //THEN
            Assertions.assertEquals(expected, actual);
        }
    }
}
