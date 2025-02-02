package com.example.BookManagementApp.service;

import com.example.BookManagementApp.model.Book;
import com.example.BookManagementApp.repository.BookRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;
    @PersistenceContext
    private EntityManager entityManager;

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }

    @Transactional
    public void deleteBooks(List<Long> ids) {
        // 指定された ID のデータを削除
        bookRepository.deleteAllById(ids);

        // AUTO_INCREMENT をリセット
        resetAutoIncrement();
    }

    @Transactional
    public void resetAutoIncrement() {
        entityManager.createNativeQuery("ALTER TABLE books AUTO_INCREMENT = 1").executeUpdate();
    }

    // IDの再採番を行う
    @Transactional
    public void resetBookIds() {
        List<Book> books = bookRepository.findAll(Sort.by("id")); // ID順で取得
        bookRepository.deleteAll(); // 全削除

        long newId = 1; // 新しい ID を 1 から振り直す
        List<Book> newBooks = new ArrayList<>();

        for (Book book : books) {
            Book newBook = new Book();
            newBook.setTitle(book.getTitle());
            newBook.setAuthor(book.getAuthor());
            newBook.setGenre(book.getGenre());
            newBooks.add(newBook);
        }

        bookRepository.saveAll(newBooks); // 再登録
    }
}

