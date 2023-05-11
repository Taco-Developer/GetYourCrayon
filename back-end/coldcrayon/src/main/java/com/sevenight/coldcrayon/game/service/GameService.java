package com.sevenight.coldcrayon.game.service;

import com.sevenight.coldcrayon.auth.dto.UserDto;
import com.sevenight.coldcrayon.game.dto.GameRequestDto;
import com.sevenight.coldcrayon.game.entity.GameCategory;
import com.sevenight.coldcrayon.theme.entity.ThemeCategory;

public interface GameService {
    ThemeCategory[] startGame(UserDto userDto, GameRequestDto gameRequestDto);

    ThemeCategory randomTheme();
    String getThemeKeyword(ThemeCategory theme);

}
