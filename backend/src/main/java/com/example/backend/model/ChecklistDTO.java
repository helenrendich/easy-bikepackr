package com.example.backend.model;

import java.time.LocalDate;
import java.util.List;


public record ChecklistDTO(
        String id,
        String destination,
        LocalDate startDate,
        List<Item> items,
        boolean isCamping
) {
}