package org.example.backend.repositories;


import org.example.backend.models.Book;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends ListCrudRepository<Book, Integer> {
    List<Book> findByUser_ClerkId(String clerkId);
}
