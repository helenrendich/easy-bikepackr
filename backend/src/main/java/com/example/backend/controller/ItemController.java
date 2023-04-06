package com.example.backend.controller;

import com.example.backend.model.Item;
import com.example.backend.model.ItemDTO;
import com.example.backend.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/easy-bikepackr/lists/{listId}")
public class ItemController {

    private final ItemService itemService;

    @PutMapping("/items")
    public Item updateItem(@PathVariable String listId, @RequestBody ItemDTO itemToUpdate) {
        return itemService.updateItem(listId, itemToUpdate);
    }
}
