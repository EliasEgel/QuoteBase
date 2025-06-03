package org.example.backend.repositories;

import org.example.backend.models.Quote;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuoteRepository extends ListCrudRepository<Quote, Integer>, PagingAndSortingRepository<Quote, Integer> {
}
