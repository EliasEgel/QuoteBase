package org.example.backend.services;

import org.example.backend.dtos.BookRequestDto;
import org.example.backend.dtos.BookResponseDto;
import org.example.backend.dtos.QuoteDto;
import org.example.backend.models.Book;
import org.example.backend.models.Quote;
import org.example.backend.models.User;
import org.example.backend.repositories.BookRepository;
import org.example.backend.repositories.QuoteRepository;
import org.example.backend.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QbService {
    private final UserRepository userRepo;
    private final QuoteRepository quoteRepo;
    private final BookRepository bookRepo;

    public QbService(UserRepository userRepo, QuoteRepository quoteRepo, BookRepository bookRepo) {
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

    public QuoteDto getQuote(int quoteId) {
        return QuoteDto.mapToDto(quoteRepo.findById(quoteId).orElseThrow());
    }

    @Transactional
    public Book addBook(BookRequestDto bookRequestDto) {
        // Check if user exists by Clerk ID
        User user = userRepo.findByClerkId(bookRequestDto.clerkId())
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setClerkId(bookRequestDto.clerkId());
                    return userRepo.save(newUser);
                });

        // Create and save the new book
        Book book = new Book();
        book.setTitle(bookRequestDto.title());
        book.setUser(user);

        return bookRepo.save(book);
    }
    public List<BookResponseDto> getBooksByClerkId(String clerkId) {
        User user = userRepo.findByClerkId(clerkId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return user.getBooks().stream()
                .map(BookResponseDto::mapToDto)
                .collect(Collectors.toList());
    }

}
