package com.sevenight.coldcrayon.game.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RequestRoundDto {
    String roomIdx;

    Long winner;

    Long loser;
}
