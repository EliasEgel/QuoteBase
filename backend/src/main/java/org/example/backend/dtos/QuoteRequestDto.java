package org.example.backend.dtos;

public record QuoteRequestDto(String text, String author, String source, String clerkId) {}