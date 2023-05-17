package com.sevenight.coldcrayon.board.dto;

import com.sevenight.coldcrayon.board.entity.Board;
import com.sevenight.coldcrayon.user.entity.User;
import lombok.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BoardDetailDto {
    private String boardTitle;
    private String boardContent;
    private String boardCreateTime;
    private String boardUpdateTime;

    public String DateToString(LocalDateTime boardUpdateTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd. HH:mm");
        String formattedDateTime = boardUpdateTime.format(formatter);
        return formattedDateTime;
    }

    public BoardDetailDto(Board board) {
        this.boardTitle = board.getBoardTitle();
        this.boardContent = board.getBoardTitle();
        this.boardCreateTime = DateToString(board.getBoardCreateTime());
        this.boardUpdateTime = DateToString(board.getBoardUpdateTime());
    }
}
