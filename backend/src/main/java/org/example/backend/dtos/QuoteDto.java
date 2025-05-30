package org.example.backend.dtos;

import org.example.backend.models.Quote;

public record QuoteDto(Long id, String text, String author, String source) {
    public static QuoteDto mapToDto(Quote quote){
        return new QuoteDto(
                quote.getId(),
                quote.getText(),
                quote.getAuthor(),
                quote.getSource()
        );
    }
}
