package org.example.backend.models;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "quotes")
public class Quote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;

    private String author;

    private String source;

    // Many-to-many with books
    @ManyToMany(mappedBy = "quotes")
    private Set<Book> books;

    // Many-to-many with users who favorited this quote
    @ManyToMany(mappedBy = "favoriteQuotes")
    private Set<User> favoritedByUsers;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public Set<Book> getBooks() {
        return books;
    }

    public void setBooks(Set<Book> books) {
        this.books = books;
    }

    public Set<User> getFavoritedByUsers() {
        return favoritedByUsers;
    }

    public void setFavoritedByUsers(Set<User> favoritedByUsers) {
        this.favoritedByUsers = favoritedByUsers;
    }

    // Getters and setters
    // ...
}

