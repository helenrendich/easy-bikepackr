package com.example.backend.service;

import com.example.backend.model.Checklist;
import com.example.backend.model.Item;
import com.example.backend.model.ItemDTO;
import com.example.backend.model.ItemRequest;
import com.example.backend.repository.ChecklistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ItemService {
    private final ChecklistRepository checklistRepository;
    private final IdService idService;
    private final DefaultItemsService defaultItemsService;

    public Checklist updateItem(String listId, ItemDTO itemToUpdateDTO) {
        Checklist checklistToUpdate = checklistRepository.findById(listId).orElseThrow(NoSuchChecklistException::new);
        Item itemToUpdate = new Item(
                itemToUpdateDTO.id(),
                itemToUpdateDTO.title(),
                itemToUpdateDTO.isTickedOff(),
                itemToUpdateDTO.category());

        boolean itemExists = checklistToUpdate.items().stream()
                .anyMatch(item -> item.id().equals(itemToUpdate.id()));

        if (!itemExists) {
            throw new NoSuchItemException();
        }

        List<Item> updatedItems = checklistRepository.findById(listId)
                .map(Checklist::items)
                .orElseThrow()
                .stream()
                .filter(item -> !item.id().equals(itemToUpdate.id()))
                .collect(Collectors.toList());
        updatedItems.add(itemToUpdate);

        Checklist updatedChecklist = new Checklist(checklistToUpdate.id(), checklistToUpdate.destination(), checklistToUpdate.startDate(), updatedItems, checklistToUpdate.isCamping());
        checklistRepository.save(updatedChecklist);

        return updatedChecklist;
    }

    public Checklist addItem(String listId, ItemRequest itemRequest) {
        Checklist checklistToUpdate = checklistRepository.findById(listId).orElseThrow(NoSuchChecklistException::new);

        if (!defaultItemsService.getValidCategories().contains(itemRequest.category())) {
            throw new IllegalArgumentException("Invalid category: " + itemRequest.category());
        }

        Item itemToAdd = new Item(
                idService.generateId(),
                itemRequest.title(),
                false,
                itemRequest.category());

        List<Item> updatedItems = checklistToUpdate.items();
        updatedItems.add(itemToAdd);

        Checklist updatedChecklist = new Checklist(checklistToUpdate.id(), checklistToUpdate.destination(), checklistToUpdate.startDate(), updatedItems, checklistToUpdate.isCamping());
        checklistRepository.save(updatedChecklist);

        return updatedChecklist;
    }
}
