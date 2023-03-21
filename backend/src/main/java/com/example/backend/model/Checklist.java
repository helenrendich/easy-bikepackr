package com.example.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document("checklist")
public record Checklist(
        @Id
        String id,
        String destination,
        LocalDate startDate
) {
}
