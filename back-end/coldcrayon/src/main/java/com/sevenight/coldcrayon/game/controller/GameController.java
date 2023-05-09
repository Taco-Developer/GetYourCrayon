package com.sevenight.coldcrayon.game.controller;

import com.sevenight.coldcrayon.game.dto.RequestGameDto;
import com.sevenight.coldcrayon.game.dto.ResponseGameDto;
import com.sevenight.coldcrayon.game.entity.GameCategory;
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
    public ResponseEntity<ThemeCategory[]> gameStart(@RequestHeader String userIdx, @RequestBody String roomIdx, @RequestBody GameCategory gameCategory) {
        // 에러는 못 던진다.....
        return ResponseEntity.ok().body(gameService.startGame(roomIdx, userIdx, gameCategory));
    }

    @PostMapping("getKeyword/")
    public ResponseEntity<String> getKeyword(@RequestBody ThemeCategory theme){
        String keyword = gameService.getThemeKeyword(theme);

        // 키워드 받아오고 모드가 ai 모드이면 api로 사진 가지고 오기 키워드는 1개, 사진은 4장
        // 게임 모드 체크하는 로직 필요

        return ResponseEntity.ok().body(keyword);
    }

    @PostMapping("settle/")
    public ResponseEntity<int[]> settle(@RequestBody String roomIdx){

        // 점수 취합으로 게임 순위 부여
        // 점수 취합해서 유저한테 포인트 부여하기

        return null;
    }


}
