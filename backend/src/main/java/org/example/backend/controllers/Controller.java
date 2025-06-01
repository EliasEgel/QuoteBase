package org.example.backend.controllers;


import org.example.backend.dtos.BookRequestDto;
import org.example.backend.dtos.BookResponseDto;
import org.example.backend.dtos.QuoteDto;
import org.example.backend.models.Book;
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
    public ResponseEntity<?> getQuote(@PathVariable("id") int id){
        try{
            QuoteDto quoteDto = quoteService.getQuote(id);
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
}
