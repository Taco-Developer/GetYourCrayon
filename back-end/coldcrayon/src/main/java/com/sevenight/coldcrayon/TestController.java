package com.sevenight.coldcrayon;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@NoArgsConstructor
@RestController
@RequestMapping("/api/test")
public class TestController {
    @GetMapping("/check")
    public ResponseEntity<?> check() {
        String string = "스트링";
        return ResponseEntity.ok().body(string);
    }
}
