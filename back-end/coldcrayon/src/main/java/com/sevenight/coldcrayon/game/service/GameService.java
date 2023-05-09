package com.sevenight.coldcrayon.game.service;

import com.sevenight.coldcrayon.theme.entity.ThemeCategory;

public interface GameService {
    ThemeCategory[] startGame(String roomIdx, String userIdx);

    String getThemeKeyword(ThemeCategory theme);

}
