package com.sevenight.coldcrayon.game.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Builder
public class ResponseGameDto {
    String theme;

    String correct;

    List<String> userList;

    String target;
}
