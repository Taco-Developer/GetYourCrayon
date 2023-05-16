package com.sevenight.coldcrayon.game.controller;

import com.sevenight.coldcrayon.auth.dto.UserDto;
import com.sevenight.coldcrayon.auth.service.AuthService;
import com.sevenight.coldcrayon.game.dto.GameRequestDto;
import com.sevenight.coldcrayon.game.service.GameService;
import com.sevenight.coldcrayon.game.service.SaveImageServiceImpl;
import com.sevenight.coldcrayon.game.service.WebClientServiceImpl;
import com.sevenight.coldcrayon.theme.entity.ThemeCategory;
import com.sevenight.coldcrayon.util.HeaderUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("/game")
@RequiredArgsConstructor
public class GameController {

    final GameService gameService;
    final AuthService authService;
    final WebClientServiceImpl webClientService;
    final SaveImageServiceImpl saveImageService;

    @PostMapping("/start")
    public ResponseEntity<?> gameStart(@RequestHeader String Authorization, @RequestBody GameRequestDto gameRequestDto) throws IOException {
        // 에러는 못 던진다.....
        System.err.println("start 컨트롤러 진입");
        UserDto user = authService.selectOneMember(HeaderUtil.getAccessTokenString(Authorization));

        return ResponseEntity.ok().body(gameService.startGame(user, gameRequestDto));
    }


    @PostMapping("startRound")
    public ResponseEntity<String> getKeyword(@RequestHeader String Authorization, @RequestBody ThemeCategory theme){
        UserDto user = authService.selectOneMember(HeaderUtil.getAccessTokenString(Authorization));

        return null;
    }



    @PostMapping("/end-round")
    public ResponseEntity<?> endRound(){
        return null;
    }

    @PostMapping("/end-game")
    public ResponseEntity<?> endGame(){
        return null;
    }


    @PostMapping("/settle")
    public ResponseEntity<int[]> settle(@RequestBody String roomIdx){

        // 점수 취합으로 게임 순위 부여
        // 점수 취합해서 유저한테 포인트 부여하기

        return null;
    }

}
