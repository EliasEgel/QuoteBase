package org.example.backend.controllers;


import org.example.backend.dtos.QuoteDto;
import org.example.backend.services.QuoteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class Controller {

    private final QuoteService service;

    public Controller(QuoteService service) {
        this.service = service;
    }


    @GetMapping("/quotes")
    public ResponseEntity<List<QuoteDto>> getAllQuotes(){
        List<QuoteDto> quoteDtoList = service.getAllQuotes();
        return ResponseEntity.ok(quoteDtoList);
    }
}
