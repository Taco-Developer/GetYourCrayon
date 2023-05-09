package com.sevenight.coldcrayon.game.service;

import com.sevenight.coldcrayon.game.dto.ResponseGameDto;

public interface GameService {
    ResponseGameDto startGame(String roomIdx, String userIdx);
}
