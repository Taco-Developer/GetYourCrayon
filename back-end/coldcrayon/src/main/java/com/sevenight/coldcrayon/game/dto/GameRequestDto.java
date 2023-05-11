package com.sevenight.coldcrayon.game.dto;

import com.sevenight.coldcrayon.game.entity.GameCategory;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Builder
public class GameRequestDto {

    private String roomIdx;

    private GameCategory gameCategory;

}
