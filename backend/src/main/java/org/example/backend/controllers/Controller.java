package org.example.backend.controllers;


import org.example.backend.dtos.*;
import org.example.backend.models.Book;
import org.example.backend.models.Quote;
import org.example.backend.services.QbService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class Controller {

    private final QbService quoteService;

    public Controller(QbService service) {
        this.quoteService = service;
    }

    @GetMapping("/quotes")
    public ResponseEntity<List<QuoteDto>> getAllQuotes(){
        List<QuoteDto> quoteDtoList = quoteService.getAllQuotes();
        return ResponseEntity.ok(quoteDtoList);
    }

    @GetMapping("/quotes/{id}")
    public ResponseEntity<?> getQuote(
            @PathVariable("id") int id,
            @RequestParam(value = "clerkId", required = false) String clerkId
    ) {
        try {
            QuoteDto quoteDto = quoteService.getQuote(id, clerkId);
            return ResponseEntity.ok(quoteDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/books")
    public ResponseEntity<?> addBook(@RequestBody BookRequestDto bookRequestDto) {
        try {
            Book book = quoteService.addBook(bookRequestDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                    "id", book.getId(),
                    "title", book.getTitle(),
                    "userId", book.getUser().getId()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/books")
    public ResponseEntity<?> getUserBooks(@RequestParam("clerkId") String clerkId) {
        try {
            List<BookResponseDto> books = quoteService.getBooksByClerkId(clerkId);
            return ResponseEntity.ok(books);
        } catch (Exception e) {
            return ResponseEntity.ok(new ArrayList<>());
        }
    }

    @PostMapping("/quotes")
    public ResponseEntity<?> createQuote(@RequestBody QuoteRequestDto dto) {
        try {
            QuoteDto saved = QuoteDto.mapToDto(quoteService.addQuote(dto), true);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @DeleteMapping("/favorites")
    public ResponseEntity<?> removeFavorite(@RequestBody FavoriteRemovalRequest request) {
        try {
            quoteService.removeFavoriteQuote(request);
            return ResponseEntity.ok(Map.of("message", "Favorite removed"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/favorites")
    public ResponseEntity<?> addFavorite(
            @RequestParam("clerkId") String clerkId,
            @RequestParam("quoteId") int quoteId
    ) {
        try {
            quoteService.addFavorite(clerkId, quoteId);
            return ResponseEntity.ok(Map.of("message", "Quote favorited"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/books/{id}")
    public ResponseEntity<?> getBookById(@PathVariable("id") int bookId) {
        try {
            BookWithQuotesDto bookDto = quoteService.getBookById(bookId);
            return ResponseEntity.ok(bookDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/books/{bookId}/quotes/{quoteId}")
    public ResponseEntity<?> addQuoteToBook(@PathVariable int bookId, @PathVariable int quoteId) {
        try {
            quoteService.addQuoteToBook(bookId, quoteId);
            return ResponseEntity.ok(Map.of("message", "Quote added to book successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }
    @GetMapping("/favorites")
    public ResponseEntity<?> getUserFavoriteQuotes(@RequestParam("clerkId") String clerkId) {
        try {
            List<QuoteDto> favoriteQuotes = quoteService.getFavoriteQuotesByClerkId(clerkId);
            return ResponseEntity.ok(favoriteQuotes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @DeleteMapping("/books/{bookId}/quotes/{quoteId}")
    public ResponseEntity<?> removeQuoteFromBook(@PathVariable int bookId, @PathVariable int quoteId) {
        try {
            quoteService.removeQuoteFromBook(bookId, quoteId);
            return ResponseEntity.ok(Map.of("message", "Quote removed from book successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }

}
