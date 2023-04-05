package com.example.backend.model;

public record Item(
        String id,
        String title,
        boolean isTickedOff,
        String category
) {
}
