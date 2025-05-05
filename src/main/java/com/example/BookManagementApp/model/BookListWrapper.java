package com.example.BookManagementApp.model;

import java.util.List;

// 書籍リストをラップするクラス
public class BookListWrapper {
    private List<Book> books;

    public List<Book> getBooks() {
        return books;
    }

    public void setBooks(List<Book> books) {
        this.books = books;
    }
}
