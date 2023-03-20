package com.example.backend.controller;

import com.example.backend.model.Checklist;
import com.example.backend.service.ChecklistService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
