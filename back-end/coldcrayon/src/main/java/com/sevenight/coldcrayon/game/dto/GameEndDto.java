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
    String type = "gameEnd";

    String status = "fail";

    String message;

    List<UserHashResponseDto> userHashResponseDtoList;

    int maxRound;

    Map<Integer, List<String>> urlList;
}
