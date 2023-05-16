package com.sevenight.coldcrayon.board.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import net.bytebuddy.asm.Advice;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ArticleDto {
    private int id;
    private String title;
    private String content;
    private LocalDateTime create_time;
    private LocalDateTime update_time;
}
