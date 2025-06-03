package org.example.backend.repositories;

import aj.org.objectweb.asm.commons.Remapper;
import org.example.backend.models.Quote;
import org.example.backend.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuoteRepository extends ListCrudRepository<Quote, Integer>, PagingAndSortingRepository<Quote, Integer> {
    Page<Quote> findByTextContainingIgnoreCase(String text, Pageable pageable);

    Page<Quote> findByCreator(User user, Pageable pageable);
}
