package com.sevenight.coldcrayon.game.dto;

import com.sevenight.coldcrayon.room.dto.UserHashResponseDto;
import lombok.*;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class GameEndDto {
    String type = "gameOver";

    String status = "fail";

    String message;

    List<UserHashResponseDto> userList;

    Map<Integer, List<String>> urlList;
}
