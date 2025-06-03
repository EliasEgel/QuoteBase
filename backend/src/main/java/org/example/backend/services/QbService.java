package org.example.backend.services;

import org.example.backend.dtos.*;
import org.example.backend.models.Book;
import org.example.backend.models.Quote;
import org.example.backend.models.User;
import org.example.backend.repositories.BookRepository;
import org.example.backend.repositories.QuoteRepository;
import org.example.backend.repositories.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
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

    public Page<QuoteDto> getAllQuotes(String search, Pageable pageable) {
        Page<Quote> quotes;

        if (search != null && !search.isBlank()) {
            quotes = quoteRepo.findByTextContainingIgnoreCase(search, pageable);
        } else {
            quotes = quoteRepo.findAll(pageable);
        }

        return mapQuotesToDtos(quotes);
    }

    public Page<QuoteDto> mapQuotesToDtos(Page<Quote> quotes) {
        if (quotes == null) {
            return Page.empty();
        }

        return quotes.map(QuoteDto::mapToDto);
    }

    public QuoteDto getQuote(int quoteId, String clerkId) {
        Quote quote = quoteRepo.findById(quoteId).orElseThrow();

        boolean isFavorited = false;
        boolean isCreatedBy = false;

        if (clerkId != null && !clerkId.isBlank()) {
            Optional<User> userOpt = userRepo.findByClerkId(clerkId);
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                isFavorited = user.getFavoriteQuotes().contains(quote);
                isCreatedBy = user.getCreatedQuotes().contains(quote);
            }
        }

        return QuoteDto.mapToDto(quote, isFavorited, isCreatedBy);
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

    @Transactional
    public Quote addQuote(QuoteRequestDto dto) {
        // Find or create user
        User user = userRepo.findByClerkId(dto.clerkId())
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setClerkId(dto.clerkId());
                    return userRepo.save(newUser);
                });

        // Create quote
        Quote quote = new Quote();
        quote.setText(dto.text());
        quote.setAuthor(dto.author());
        quote.setSource(dto.source());
        quote.setCreator(user); // Set creator

        Quote savedQuote = quoteRepo.save(quote);

        // Add to user's favorites
        user.getFavoriteQuotes().add(savedQuote);
        savedQuote.getFavoritedByUsers().add(user);

        return savedQuote;
    }


    @Transactional
    public void removeFavoriteQuote(FavoriteRemovalRequest request) {
        User user = userRepo.findByClerkId(request.clerkId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Quote quote = quoteRepo.findById(request.quoteId())
                .orElseThrow(() -> new RuntimeException("Quote not found"));

        user.getFavoriteQuotes().remove(quote);
        quote.getFavoritedByUsers().remove(user);

        userRepo.save(user);
        quoteRepo.save(quote);
    }

    public void addFavorite(String clerkId, int quoteId) {
        User user = userRepo.findByClerkId(clerkId)
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setClerkId(clerkId);

                    return userRepo.save(newUser);
                }
                ); // Auto-create user if not found

        Quote quote = quoteRepo.findById(quoteId)
                .orElseThrow(() -> new RuntimeException("Quote not found"));

        user.getFavoriteQuotes().add(quote);
        userRepo.save(user);
    }
    public BookWithQuotesDto getBookById(int bookId) {
        Book book = bookRepo.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));
        return BookWithQuotesDto.mapToDto(book);
    }

    @Transactional
    public void addQuoteToBook(int bookId, int quoteId) {
        Book book = bookRepo.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        Quote quote = quoteRepo.findById(quoteId)
                .orElseThrow(() -> new RuntimeException("Quote not found"));

        book.getQuotes().add(quote);
        bookRepo.save(book);
    }

    public Page<QuoteDto> getFavoriteQuotesByClerkId(String clerkId, Pageable pageable) {
        User user = userRepo.findByClerkId(clerkId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Quote> allFavorites = user.getFavoriteQuotes().stream().toList();
        List<QuoteDto> dtoList = allFavorites.stream()
                .map(QuoteDto::mapToDto)
                .collect(Collectors.toList());

        int start = (int) pageable.getOffset();
        int end = Math.min(start + pageable.getPageSize(), dtoList.size());

        List<QuoteDto> pagedList = dtoList.subList(start, end);

        return new PageImpl<>(pagedList, pageable, dtoList.size());
    }

    public void removeQuoteFromBook(int bookId, int quoteId) {
        Book book = bookRepo.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        Quote quote = quoteRepo.findById(quoteId)
                .orElseThrow(() -> new RuntimeException("Quote not found"));

        if (!book.getQuotes().contains(quote)) {
            throw new RuntimeException("Quote is not part of the book");
        }

        book.getQuotes().remove(quote);
        bookRepo.save(book);
    }

    @Transactional
    public void deleteQuoteById(int quoteId) {
        Quote quote = quoteRepo.findById(quoteId)
                .orElseThrow(() -> new RuntimeException("Quote not found"));

        // Remove quote from all books
        for (Book book : new HashSet<>(quote.getBooks())) {
            book.getQuotes().remove(quote);
        }

        // Remove quote from all users' favorites
        for (User user : new HashSet<>(quote.getFavoritedByUsers())) {
            user.getFavoriteQuotes().remove(quote);
        }

        quoteRepo.delete(quote);
    }

    public Page<QuoteDto> getQuotesCreatedByUser(String clerkId, Pageable pageable) {
        User user = userRepo.findByClerkId(clerkId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return quoteRepo.findByCreator(user, pageable)
                .map(quote -> {
                    boolean isFavorited = quote.getFavoritedByUsers().contains(user);
                    return QuoteDto.mapToDto(quote, isFavorited, true);
                });
    }

}
