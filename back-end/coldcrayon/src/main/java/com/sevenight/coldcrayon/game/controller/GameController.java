package com.sevenight.coldcrayon.game.controller;

import com.sevenight.coldcrayon.game.dto.RequestGameDto;
import com.sevenight.coldcrayon.game.dto.ResponseGameDto;
import com.sevenight.coldcrayon.game.service.GameService;
import com.sevenight.coldcrayon.theme.entity.ThemeCategory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/game")
@RequiredArgsConstructor
public class GameController {

    GameService gameService;

    @PatchMapping("/start")
    public ResponseEntity<ThemeCategory[]> gameStart(@RequestHeader String userIdx, @RequestBody String roomIdx) {
        // 에러는 못 던진다.....
        return ResponseEntity.ok().body(gameService.startGame(roomIdx, userIdx));
    }

    @PostMapping("getKeyword/")
    public ResponseEntity<String> getKeyword(@RequestBody ThemeCategory theme){
        gameService.getThemeKeyword(theme);

        return null;
    }


}
