package com.example.backend.service;

import com.example.backend.model.Checklist;
import com.example.backend.model.Item;
import com.example.backend.model.ItemDTO;
import com.example.backend.model.ItemRequest;
import com.example.backend.repository.ChecklistRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.time.LocalDate;
import java.util.List;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;


@SpringBootTest
class ItemServiceTest {

    @Autowired
    ChecklistRepository checklistRepository;
    @Autowired
    ItemService itemService;
    IdService mockedIdService = mock(IdService.class);
    DefaultItemsService mockedDefaultItemsService = mock(DefaultItemsService.class);
    String testListId = "Some test ID";
    String testDestination = "testDestination";
    LocalDate testLocalDate = LocalDate.of(2024, 1, 8);
    Item testItem = new Item("ItemTestId", "Helmet", false, "Bike Gear");
    ItemDTO testItemToUpdate = new ItemDTO("ItemTestId", "Helmet", true, "Bike Gear");
    Item testItemUpdated = new Item("ItemTestId", "Helmet", true, "Bike Gear");
    ItemDTO testItemToUpdateWithNonExistingID = new ItemDTO("ItemFalseId", "Helmet", true, "Bike Gear");
    ItemRequest testItemRequest = new ItemRequest("testItemToAdd", "Bike Gear");
    ItemRequest testItemRequestInvalidCategory = new ItemRequest("testItemToAdd", "Invalid Category");
    List<Item> testItems = List.of(testItem);
    List<Item> testItemsWithNewItem = List.of(testItem, new Item("newId", testItemRequest.title(), false, testItemRequest.category()));
    List<Item> testItemsUpdated = List.of(testItemUpdated);
    Checklist testChecklist = new Checklist(testListId, testDestination, testLocalDate, testItems, false);
    Checklist testChecklistWithNewItem = new Checklist(testListId, testDestination, testLocalDate, testItemsWithNewItem, false);
    Checklist testChecklistNoItems = new Checklist(testListId, testDestination, testLocalDate, List.of(), false);
    List<String> validCategories = List.of("Bike Gear");

    @BeforeEach
    @DisplayName("set up test environment")
    void setUp() {
        itemService = new ItemService(checklistRepository, mockedIdService, mockedDefaultItemsService);
        when(mockedIdService.generateId()).thenReturn("newId");
        when(mockedDefaultItemsService.getValidCategories()).thenReturn(validCategories);
    }

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

    @Nested
    @DisplayName("testing addItem()")
    class addItemTest {

        @Test
        @DirtiesContext
        @DisplayName("...throws an exception if the checklist with the given id does not exist")
        void addItem_throwsExceptionIfTheChecklistWithTheGivenIdDoesNotExist() {
            //GIVEN
            Class<NoSuchChecklistException> expected = NoSuchChecklistException.class;
            //WHEN+THEN
            Assertions.assertThrows(expected, () -> itemService.addItem(testListId, testItemRequest));
        }

        @Test
        @DirtiesContext
        @DisplayName("...throws an exception if the category of the item doesn't exist")
        void addItem_throwsExceptionIfCategoryIsInvalid() {
            //GIVEN
            checklistRepository.save(testChecklist);
            Class<IllegalArgumentException> expected = IllegalArgumentException.class;
            //WHEN+THEN
            Assertions.assertThrows(expected, () -> itemService.addItem(testListId, testItemRequestInvalidCategory));
        }

        @Test
        @DirtiesContext
        @DisplayName("...generates a UUID for the item and adds it to the given checklist in the database")
        void addItem() {
            //GIVEN
            checklistRepository.save(testChecklist);
            Checklist expected = testChecklistWithNewItem;
            //WHEN
            Checklist actual = itemService.addItem(testListId, testItemRequest);
            //THEN
            Assertions.assertEquals(expected, actual);
        }
    }

    @Nested
    @DisplayName("delete addItem()")
    class deleteItemTest {
        @Test
        @DirtiesContext
        @DisplayName("...throws an exception if the checklist with the given id does not exist")
        void deleteItem_throwsExceptionIfTheChecklistWithTheGivenIdDoesNotExist() {
            //GIVEN
            Class<NoSuchChecklistException> expected = NoSuchChecklistException.class;
            //WHEN+THEN
            Assertions.assertThrows(expected, () -> itemService.deleteItem(testListId, testItem.id()));
        }

        @Test
        @DirtiesContext
        @DisplayName("...throws an exception if the item in a specific checklist with the given item-id does not exist")
        void deleteItem_throwsExceptionIfTheItemWithTheGivenIdDoesNotExist() {
            //GIVEN
            checklistRepository.save(testChecklist);
            Class<NoSuchItemException> expected = NoSuchItemException.class;
            //WHEN+THEN
            Assertions.assertThrows(expected, () -> itemService.deleteItem(testListId, "randomNonExistingId"));
        }

        @Test
        @DirtiesContext
        @DisplayName("...deletes item of the given checklist in the database")
        void deleteItem() {
            //GIVEN
            checklistRepository.save(testChecklist);
            Checklist expected = testChecklistNoItems;
            //WHEN
            Checklist actual = itemService.deleteItem(testListId, testItem.id());
            //THEN
            Assertions.assertEquals(expected, actual);
        }
    }
}
