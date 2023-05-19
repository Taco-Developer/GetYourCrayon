package com.sevenight.coldcrayon.game.dto;

import com.sevenight.coldcrayon.game.entity.GameCategory;
import lombok.*;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class GameRequestDto {

    private String roomIdx;

    private GameCategory gameCategory;

    private int maxRound;

}
