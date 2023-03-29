package com.example.backend.model;

import java.time.LocalDate;


public record ChecklistDTO(
        String id,
        String destination,
        LocalDate startDate
) {
}