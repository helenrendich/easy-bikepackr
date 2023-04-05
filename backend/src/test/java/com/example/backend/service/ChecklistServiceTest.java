package com.example.backend.service;

import com.example.backend.model.Checklist;
import com.example.backend.model.ChecklistDTO;
import com.example.backend.model.ChecklistRequest;
import com.example.backend.model.Item;
import com.example.backend.repository.ChecklistRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;

@SpringBootTest
class ChecklistServiceTest {

    @Autowired
    ChecklistRepository checklistRepository;
    IdService mockedIdService = mock(IdService.class);
    DefaultItemsService defaultItemsService = mock(DefaultItemsService.class);
    @Autowired
    ChecklistService checklistService;

    String testId = "Some test ID";
    String testDestination = "testDestination";
    LocalDate testLocalDate = LocalDate.of(2024, 1, 8);
    String testDestinationUpdated = "updated testDestination";
    LocalDate testLocalDateUpdated = LocalDate.of(2025, 1, 8);
    Item testItem = new Item("ItemTestId", "Helmet", false, "Bike Gear");
    List<Item> testItems = List.of(testItem);

    Checklist testChecklist = new Checklist(testId, testDestination, testLocalDate, testItems);
    ChecklistDTO testChecklistUpdated = new ChecklistDTO(testId, testDestinationUpdated, testLocalDateUpdated, testItems);
    ChecklistRequest testChecklistRequest = new ChecklistRequest(testDestination, testLocalDate);

    @BeforeEach
    @DisplayName("set up test environment")
    void setUp() {
        checklistService = new ChecklistService(checklistRepository, mockedIdService, defaultItemsService);
        when(mockedIdService.generateId()).thenReturn(testChecklist.id());
        when(defaultItemsService.getDefaultItems()).thenReturn(testItems);
    }

    @Nested
    @DisplayName("testing getAllChecklists()")
    class getAllChecklistsTest {

        @Test
        @DisplayName("...returns an empty list if the repo is empty")
        void getAllChecklistsEmptyRepo() {
            //GIVEN
            List<Checklist> expected = new ArrayList<>();
            //WHEN
            List<Checklist> actual = checklistService.getAllChecklists();
            //THEN
            Assertions.assertEquals(expected, actual);
        }

        @Test
        @DirtiesContext
        @DisplayName("...returns all checklists if the repo is not empty")
        void getAllChecklists_returnsAllChecklistsIfTheRepoIsNotEmpty() {
            //GIVEN
            checklistRepository.save(testChecklist);
            List<Checklist> expected = List.of(testChecklist);
            //WHEN
            List<Checklist> actual = checklistService.getAllChecklists();
            //THEN
            Assertions.assertEquals(expected, actual);
        }
    }

    @Nested
    @DisplayName("testing addChecklist()")
    class addChecklistTest {

        @Test
        @DirtiesContext
        @DisplayName("...generates a UUID for the checklist and adds it to the database")
        void addChecklist() {
            //GIVEN
            Checklist expected = testChecklist;
            //WHEN
            Checklist actual = checklistService.addChecklist(testChecklistRequest);
            //THEN
            verify(mockedIdService).generateId();
            verify(defaultItemsService).getDefaultItems();
            Assertions.assertEquals(expected, actual);
        }
    }

    @Nested
    @DisplayName("testing deleteChecklist()")
    class deleteChecklistTest {

        @Test
        @DisplayName("...deletes an existing checklist and returns the deleted checklist")
        void deleteExistingChecklist() {
            //GIVEN
            checklistRepository.save(testChecklist);
            //WHEN
            Checklist actual = checklistService.deleteChecklist(testChecklist.id());
            //THEN
            Assertions.assertEquals(testChecklist, actual);
        }

        @Test
        @DirtiesContext
        @DisplayName("...throws an exception if the checklist with the given id does not exist")
        void deleteChecklistIdInvalid() {
            //GIVEN
            //THEN
            Assertions.assertThrows(NoSuchChecklistException.class, () -> checklistService.deleteChecklist("41"));
        }
    }

    @Nested
    @DisplayName("testing updateChecklist()")
    class updateChecklistTest {

        @Test
        @DirtiesContext
        @DisplayName("...throws an exception if the checklist with the given id does not exist yet")
        void updateChecklist_throwsExceptionIfTheChecklistWithTheGivenIdDoesNotExist() {
            //GIVEN
            Class<NoSuchChecklistException> expected = NoSuchChecklistException.class;
            //WHEN + THEN
            Assertions.assertThrows(expected, () -> checklistService.updateChecklist(testChecklistUpdated));
        }

        @Test
        @DirtiesContext
        @DisplayName("...updates an existing checklist in the database if the checklist with the given id does already exist")
        void updateChecklist_updatesChecklistInTheDatabaseIfTheChecklistWithTheGivenIdDoesExist() {
            //GIVEN
            checklistRepository.save(testChecklist);
            Checklist expected = new Checklist(testChecklist.id(), testChecklistUpdated.destination(), testChecklistUpdated.startDate(), testItems);
            //WHEN
            Checklist actual = checklistService.updateChecklist(testChecklistUpdated);
            //THEN
            Assertions.assertEquals(expected, actual);
        }
    }
}
