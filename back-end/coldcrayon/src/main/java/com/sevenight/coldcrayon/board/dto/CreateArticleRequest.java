package com.sevenight.coldcrayon.board.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class CreateArticleRequest {


    private String title;
    private String content;
}
