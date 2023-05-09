package com.sevenight.coldcrayon.game.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ResponseGameDto {
    String theme;

    String correct;

    List<String> userList;

    String target;
}
