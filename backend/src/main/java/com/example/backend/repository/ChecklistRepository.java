package com.example.backend.repository;

import com.example.backend.model.Checklist;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Repository
public class ChecklistRepository {

    private final Map<String, Checklist> checklistMap;

    public List<Checklist> getAllChecklists() {
        return checklistMap.values().stream().toList();
    }
}
