package org.example.backend.dtos;

import org.example.backend.models.Book;

public record BookResponseDto(Long id, String title, int quoteCount) {
    public static BookResponseDto mapToDto(Book book) {
        return new BookResponseDto(book.getId(), book.getTitle(), book.getQuotes().size());
    }
}
