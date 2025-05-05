package com.example.BookManagementApp.controller;

import com.example.BookManagementApp.model.Book;
import com.example.BookManagementApp.model.BookListWrapper;
import com.example.BookManagementApp.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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


    // 選択されたIDの書籍更新
    @PostMapping("/updateBooks")
    public String updateBooks(@ModelAttribute BookListWrapper bookList, RedirectAttributes redirectAttributes) {
        // 🔹 null チェックを行い、入力があるデータのみリスト化
        List<Book> validBooks = bookList.getBooks().stream()
                .filter(book -> book.getTitle() != null && !book.getTitle().isEmpty()) // タイトルがあるもののみ残す
                .collect(Collectors.toList());

        if (validBooks.isEmpty()) {
            // 🔹 更新対象がない場合のメッセージ
            redirectAttributes.addFlashAttribute("message", "更新対象がありませんでした。");
            return "redirect:/";
        }

        // 🔹 書籍を更新
        for (Book book : validBooks) {
            bookService.saveBook(book);
        }

        // 🔹 更新完了のメッセージを追加
        redirectAttributes.addFlashAttribute("message", "書籍情報が更新されました。");

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
