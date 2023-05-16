package com.sevenight.coldcrayon.game.service;

import com.sevenight.coldcrayon.auth.dto.UserDto;
import com.sevenight.coldcrayon.game.dto.GameRequestDto;
import com.sevenight.coldcrayon.game.dto.ResponseGameDto;
import com.sevenight.coldcrayon.theme.entity.ThemeCategory;

import java.io.IOException;

public interface GameService {
    ResponseGameDto startGame(UserDto userDto, GameRequestDto gameRequestDto) throws IOException;

}
