package com.example.backend.service;

import com.example.backend.model.Checklist;
import com.example.backend.repository.ChecklistRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;

class ChecklistServiceTest {

    ChecklistRepository checklistRepository = mock(ChecklistRepository.class);
    ChecklistService checklistService = new ChecklistService(checklistRepository);

    Checklist testChecklist = new Checklist("testId", "testDestination", LocalDate.of(2024, 1, 8));
    List<Checklist> expectedChecklists = List.of(testChecklist);
    List<Checklist> expectedChecklistsEmpty = new ArrayList<>();

    @Nested
    @DisplayName("testing getAllChecklists()")
    class getAllChecklistsTest {
        @Test
        @DisplayName("...returns all checklists if the repo is not empty")
        void getAllChecklists_returnsAllChecklistsIfTheRepoIsNotEmpty() {
            //GIVEN
            when(checklistRepository.findAll()).thenReturn(expectedChecklists);
            //WHEN
            List<Checklist> actual = checklistService.getAllChecklists();
            //THEN
            verify(checklistRepository).findAll();
            Assertions.assertEquals(expectedChecklists, actual);
        }

        @Test
        @DisplayName("...returns an empty list if the repo is empty")
        void getAllChecklistsEmptyRepo() {
            //GIVEN
            when(checklistRepository.findAll()).thenReturn(expectedChecklistsEmpty);
            //WHEN
            List<Checklist> actual = checklistService.getAllChecklists();
            //THEN
            verify(checklistRepository).findAll();
            Assertions.assertEquals(expectedChecklistsEmpty, actual);
        }
    }
}
