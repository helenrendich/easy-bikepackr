package com.example.backend.model;

import java.time.LocalDate;

public record ChecklistRequest(
        String destination,
        LocalDate startDate,
        boolean isCamping
) {
}
