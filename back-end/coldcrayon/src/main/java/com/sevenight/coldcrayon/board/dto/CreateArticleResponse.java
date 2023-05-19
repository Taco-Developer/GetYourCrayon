package com.sevenight.coldcrayon.board.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class CreateArticleResponse {

    private int id;
    private String title;
    private String content;
    private LocalDateTime create_time;
    private LocalDateTime update_time;

    public CreateArticleResponse(int id, String title, String content, LocalDateTime time1, LocalDateTime time2) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.create_time = time1;
        this.update_time = time2;
    }
}
