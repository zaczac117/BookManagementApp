package com.example.BookManagementApp.controller;

import com.example.BookManagementApp.model.Book;
import com.example.BookManagementApp.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    // 選択されたIDの書籍削除
    @PostMapping("/deleteBooks")
    public ResponseEntity<Map<String, String>> deleteBooks(@RequestBody Map<String, List<Long>> requestBody) {
        List<Long> ids = requestBody.get("ids");
        if (ids == null || ids.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "削除対象がありません"));
        }

        bookService.deleteBooks(ids);  // サービス層で削除処理
        return ResponseEntity.ok(Map.of("message", "削除完了"));
    }
}
