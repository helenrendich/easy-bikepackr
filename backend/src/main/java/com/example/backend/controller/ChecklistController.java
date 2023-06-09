package com.example.backend.controller;

import com.example.backend.model.Checklist;
import com.example.backend.model.ChecklistDTO;
import com.example.backend.model.ChecklistRequest;
import com.example.backend.service.ChecklistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/easy-bikepackr/lists")
public class ChecklistController {

    private final ChecklistService checklistService;

    @GetMapping
    public List<Checklist> getAllChecklists() {
        return checklistService.getAllChecklists();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Checklist addChecklist(@RequestBody ChecklistRequest checklistRequest) {
        return checklistService.addChecklist(checklistRequest);
    }

    @DeleteMapping("/{id}")
    public Checklist deleteChecklist(@PathVariable String id) {
        return checklistService.deleteChecklist(id);
    }

    @PutMapping
    public Checklist updateChecklist(@RequestBody ChecklistDTO checklistToUpdate) {
        return checklistService.updateChecklist(checklistToUpdate);
    }
}
