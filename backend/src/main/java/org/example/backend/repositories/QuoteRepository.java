package org.example.backend.repositories;

import org.example.backend.models.Quote;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuoteRepository extends ListCrudRepository<Quote, Integer>, PagingAndSortingRepository<Quote, Integer> {
    Page<Quote> findByTextContainingIgnoreCase(String text, Pageable pageable);
}
