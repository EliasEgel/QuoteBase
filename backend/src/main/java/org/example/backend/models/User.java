package org.example.backend.models;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users") // avoid reserved keyword issues
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String clerkId;

    @ManyToMany
    @JoinTable(
            name = "user_favorite_quotes",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "quote_id")
    )
    private Set<Quote> favoriteQuotes = new HashSet<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Book> books;

    @OneToMany(mappedBy = "creator", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Quote> createdQuotes = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClerkId() {
        return clerkId;
    }

    public void setClerkId(String clerkId) {
        this.clerkId = clerkId;
    }

    public Set<Quote> getFavoriteQuotes() {
        return favoriteQuotes;
    }

    public void setFavoriteQuotes(Set<Quote> favoriteQuotes) {
        this.favoriteQuotes = favoriteQuotes;
    }

    public Set<Book> getBooks() {
        return books;
    }

    public void setBooks(Set<Book> books) {
        this.books = books;
    }

    public Set<Quote> getCreatedQuotes() {
        return createdQuotes;
    }

    public void setCreatedQuotes(Set<Quote> createdQuotes) {
        this.createdQuotes = createdQuotes;
    }
}

