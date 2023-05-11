package com.sevenight.coldcrayon.game.service;

import com.sevenight.coldcrayon.auth.dto.UserDto;
import com.sevenight.coldcrayon.game.entity.GameCategory;
import com.sevenight.coldcrayon.theme.entity.ThemeCategory;

public interface GameService {
    ThemeCategory[] startGame(UserDto userDto,String roomIdx, GameCategory gameCategory);

    String getThemeKeyword(ThemeCategory theme);

}
