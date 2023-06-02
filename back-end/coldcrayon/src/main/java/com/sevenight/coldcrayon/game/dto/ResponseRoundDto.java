package com.sevenight.coldcrayon.game.dto;

import java.util.List;

import com.sevenight.coldcrayon.room.dto.UserHashResponseDto;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ResponseRoundDto {

    String type = "roundOver";

    String status;

    String message;

    Long winnerUserIdx;

    int defualtScore;

    int winnerScore;

    List<UserHashResponseDto> userList;

}
