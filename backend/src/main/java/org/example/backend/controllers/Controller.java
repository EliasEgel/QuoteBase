package org.example.backend.controllers;


import org.example.backend.dtos.QuoteDto;
import org.example.backend.services.QuoteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class Controller {

    private final QuoteService quoteService;

    public Controller(QuoteService service) {
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
}
