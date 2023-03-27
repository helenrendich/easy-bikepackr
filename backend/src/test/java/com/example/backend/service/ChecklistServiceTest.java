package com.example.backend.service;

import com.example.backend.model.Checklist;
import com.example.backend.model.ChecklistRequest;
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
    @Autowired
    ChecklistService checklistService;

    String testId = "Some test ID";
    String testDestination = "testDestination";
    LocalDate testLocalDate = LocalDate.of(2024, 1, 8);

    Checklist testChecklist = new Checklist(testId, testDestination, testLocalDate);
    ChecklistRequest testChecklistRequest = new ChecklistRequest(testDestination, testLocalDate);

    @BeforeEach
    @DisplayName("set up test environment")
    void setUp() {
        checklistService = new ChecklistService(checklistRepository, mockedIdService);
        when(mockedIdService.generateId()).thenReturn(testChecklist.id());
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
    @DisplayName("testing getChecklistById()")
    class getChecklistByIdTest {

        @Test
        @DirtiesContext
        @DisplayName("... returns a checklist if the checklist with the given id exists")
        void getChecklistById_IdExists() throws NoSuchChecklistException {
            //GIVEN
            checklistRepository.save(testChecklist);
            //WHEN
            Checklist actual = checklistService.getChecklistById(testChecklist.id());
            //THEN
            Assertions.assertEquals(testChecklist, actual);
        }

        @Test
        @DisplayName("...throws an exception if no checklist with the given id exists")
        void getChecklistById_throwExceptionIfNoChecklistWithTheGivenIdExists() throws NoSuchChecklistException {
            Class<NoSuchChecklistException> expected = NoSuchChecklistException.class;
            Assertions.assertThrows(expected, () -> checklistService.getChecklistById("41"));
        }
    }
}
