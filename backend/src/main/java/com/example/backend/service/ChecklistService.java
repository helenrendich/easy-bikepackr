package com.example.backend.service;

import com.example.backend.model.Checklist;
import com.example.backend.model.ChecklistDTO;
import com.example.backend.model.ChecklistRequest;
import com.example.backend.repository.ChecklistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Checklist deleteChecklist(String id) {
        Optional<Checklist> checklistToDelete = checklistRepository.findById(id);
        if (checklistToDelete.isEmpty()) {
            throw new NoSuchChecklistException();
        } else {
            checklistRepository.deleteById(id);
            return checklistToDelete.get();
        }
    }

    public Checklist updateChecklist(ChecklistDTO incomingChecklist) throws NoSuchChecklistException {
        if (!checklistRepository.existsById(incomingChecklist.id())) {
            throw new NoSuchChecklistException();
        }
        Checklist result = new Checklist(incomingChecklist.id(), incomingChecklist.destination(), incomingChecklist.startDate());
        return checklistRepository.save(result);
    }
}
