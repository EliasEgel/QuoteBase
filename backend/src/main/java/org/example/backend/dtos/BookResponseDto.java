package org.example.backend.dtos;

import org.example.backend.models.Book;

public record BookResponseDto(String title, int quoteCount) {
    public static BookResponseDto mapToDto(Book book) {
        return new BookResponseDto(book.getTitle(), book.getQuotes().size());
    }
}
