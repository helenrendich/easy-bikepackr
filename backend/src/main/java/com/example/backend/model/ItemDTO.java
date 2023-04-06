package com.example.backend.model;

public record ItemDTO(
        String id,
        String title,
        boolean isTickedOff,
        String category
) {
}
