package com.example.BookManagementApp.controller;

import com.example.BookManagementApp.model.Book;
import com.example.BookManagementApp.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class BookController {
    @Autowired
    private BookService bookService;

    @GetMapping("/")
    public String viewBooks(Model model) {
        model.addAttribute("books", bookService.getAllBooks());
        return "index";
    }

    @PostMapping("/addBook")
    public String addBook(Book book) {
        bookService.saveBook(book);
        return "redirect:/";
    }
}
