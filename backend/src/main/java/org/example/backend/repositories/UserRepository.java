package org.example.backend.repositories;

import org.example.backend.models.User;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends ListCrudRepository<User, Integer> {
    Optional<User> findByClerkId(String clerkId);
}
