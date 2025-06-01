package org.example.backend.dtos;

import org.example.backend.models.Book;

import java.util.List;

public record BookWithQuotesDto(Long id, String title, List<QuoteDto> quotes) {
    public static BookWithQuotesDto mapToDto(Book book) {
        List<QuoteDto> quoteDtos = book.getQuotes().stream()
                .map(QuoteDto::mapToDto)
                .toList();

        return new BookWithQuotesDto(book.getId(), book.getTitle(), quoteDtos);
    }
}
