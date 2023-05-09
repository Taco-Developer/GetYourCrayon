package com.sevenight.coldcrayon.game.service;

import com.sevenight.coldcrayon.game.entity.GameCategory;
import com.sevenight.coldcrayon.theme.entity.ThemeCategory;

public interface GameService {
    ThemeCategory[] startGame(String roomIdx, String userIdx, GameCategory gameCategory);

    String getThemeKeyword(ThemeCategory theme);

}
