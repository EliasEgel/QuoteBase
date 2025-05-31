package org.example.backend.services;

import org.example.backend.repositories.BookRepository;
import org.example.backend.repositories.QuoteRepository;
import org.example.backend.repositories.UserRepository;
import org.springframework.stereotype.Service;

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
}
