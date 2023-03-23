package com.example.backend.service;

import com.example.backend.model.Checklist;
import com.example.backend.model.ChecklistRequest;
import com.example.backend.repository.ChecklistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ChecklistService {

    private final ChecklistRepository checklistRepository;

    private final IdService idService;

    public List<Checklist> getAllChecklists() {
        return checklistRepository.findAll();
    }

    public Checklist addChecklist(ChecklistRequest incomingChecklist) {
        Checklist checklistToAdd =
                new Checklist(idService.generateId(), incomingChecklist.destination(), incomingChecklist.startDate());
        return checklistRepository.save(checklistToAdd);
    }
}
