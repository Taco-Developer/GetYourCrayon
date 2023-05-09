package com.sevenight.coldcrayon.game.controller;

import com.sevenight.coldcrayon.game.dto.RequestGameDto;
import com.sevenight.coldcrayon.game.dto.ResponseGameDto;
import com.sevenight.coldcrayon.game.service.GameService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/game")
@RequiredArgsConstructor
public class GameController {

    GameService gameService;

    @PatchMapping("/start")
    public ResponseGameDto gameStart(@RequestHeader String userIdx, @RequestBody String roomIdx) {

        gameService.startGame(roomIdx, userIdx);
        return null;
    }

}
