package com.sevenight.coldcrayon.game.dto;

import com.sevenight.coldcrayon.theme.entity.ThemeCategory;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ResponseGameDto {
    String type = "gameDto";

    String message;

    String status;

    ThemeCategory theme;

    String correct;

    List<Object> userList;

    Long selectedUserIdx;

    List<String> urlList;
}
