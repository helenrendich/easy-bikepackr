package com.example.backend.service;

import com.example.backend.model.Checklist;
import com.example.backend.repository.ChecklistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ChecklistService {

    private final ChecklistRepository checklistRepository;

    public List<Checklist> getAllChecklists() {
        return checklistRepository.getAllChecklists();
    }
}
