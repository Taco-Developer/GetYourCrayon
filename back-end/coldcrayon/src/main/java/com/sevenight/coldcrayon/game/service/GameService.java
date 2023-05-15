package com.sevenight.coldcrayon.game.service;

import com.sevenight.coldcrayon.auth.dto.UserDto;
import com.sevenight.coldcrayon.game.dto.GameRequestDto;
import com.sevenight.coldcrayon.theme.entity.ThemeCategory;

public interface GameService {
    String startGame(UserDto userDto, GameRequestDto gameRequestDto);

    Object choiceUser(String roomIdx);
}
