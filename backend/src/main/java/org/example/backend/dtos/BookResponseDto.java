package org.example.backend.dtos;

import org.example.backend.models.Book;
import org.example.backend.models.Quote;

import java.util.List;
import java.util.stream.Collectors;

public record BookResponseDto(Long id, String title, List<Long> quoteIds, int quoteCount) {
    public static BookResponseDto mapToDto(Book book) {
        return new BookResponseDto(
                book.getId(),
                book.getTitle(),
                book.getQuotes().stream()
                        .map(Quote::getId)
                        .collect(Collectors.toList()),
                book.getQuotes().size()
        );
    }
}
