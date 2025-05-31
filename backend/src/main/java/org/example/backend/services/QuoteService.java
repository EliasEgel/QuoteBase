package org.example.backend.services;

import org.example.backend.dtos.QuoteDto;
import org.example.backend.models.Quote;
import org.example.backend.repositories.BookRepository;
import org.example.backend.repositories.QuoteRepository;
import org.example.backend.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuoteService {
    private final UserRepository userRepo;
    private final QuoteRepository quoteRepo;
    private final BookRepository bookRepo;

    public QuoteService(UserRepository userRepo, QuoteRepository quoteRepo, BookRepository bookRepo) {
        this.userRepo = userRepo;
        this.quoteRepo = quoteRepo;
        this.bookRepo = bookRepo;
    }

    public List<QuoteDto> getAllQuotes() {
        return mapQuotesToDtos(quoteRepo.findAll());
    }

    public List<QuoteDto> mapQuotesToDtos(List<Quote> quotes) {
        if (quotes == null) {
            return List.of();
        }

        return quotes.stream()
                .map(QuoteDto::mapToDto)
                .collect(Collectors.toList());
    }
}
