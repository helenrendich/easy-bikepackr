package com.example.backend.controller;

import com.example.backend.model.Checklist;
import com.example.backend.model.ItemDTO;
import com.example.backend.model.ItemRequest;
import com.example.backend.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/easy-bikepackr/lists/{listId}")
public class ItemController {

    private final ItemService itemService;

    @PutMapping("/items")
    public Checklist updateItem(@PathVariable String listId, @RequestBody ItemDTO itemToUpdate) {
        return itemService.updateItem(listId, itemToUpdate);
    }

    @PostMapping("/items")
    public Checklist addItem(@PathVariable String listId, @RequestBody ItemRequest itemRequest) {
        return itemService.addItem(listId, itemRequest);
    }
}
