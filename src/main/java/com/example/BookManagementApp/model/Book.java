package com.example.BookManagementApp.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String author;
    private String genre;
    @Enumerated(EnumType.STRING)
    private Status status;
    private LocalDate returnDate;
    private String imageUrl;

    // Enum for Status
    public enum Status {
        空, 申請中, 貸出中, 追加予定
    }
    // Getters and Setters
}
