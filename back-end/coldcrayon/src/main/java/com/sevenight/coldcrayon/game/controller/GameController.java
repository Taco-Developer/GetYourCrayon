package com.sevenight.coldcrayon.game.controller;

import com.sevenight.coldcrayon.auth.dto.UserDto;
import com.sevenight.coldcrayon.auth.service.AuthService;
import com.sevenight.coldcrayon.game.dto.GameRequestDto;
import com.sevenight.coldcrayon.game.entity.GameCategory;
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
import java.util.Arrays;
import java.util.List;
import java.util.Map;

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
    public ResponseEntity<?> gameStart(@RequestHeader String Authorization, @RequestBody GameRequestDto gameRequestDto) {
        // 에러는 못 던진다.....
//        UserDto user = authService.selectOneMember(HeaderUtil.getAccessTokenString(Authorization));
        UserDto user = UserDto.builder().userIdx(1L).userEmail("1번@naver.com").userPoint(0).userNickname("바보").build();
        gameService.startGame(user, gameRequestDto);

        return ResponseEntity.ok().body(null);
    }

    @PostMapping("startRound")
    public ResponseEntity<String> getKeyword(@RequestHeader String Authorization, @RequestBody ThemeCategory theme){
        //        UserDto user = authService.selectOneMember(HeaderUtil.getAccessTokenString(Authorization));
        UserDto user = UserDto.builder().userIdx(1L).userEmail("1번@naver.com").userPoint(0).userNickname("바보").build();

//        String keyword = gameService.getThemeKeyword(theme);

        // 키워드 받아오고 모드가 ai 모드이면 api로 사진 가지고 오기 키워드는 1개, 사진은 4장
        // 게임 모드 체크하는 로직 필요

//        return ResponseEntity.ok().body(keyword);
        return null;
    }

    @GetMapping("/save-image")
    public ResponseEntity<?> saveImage(@RequestHeader String Authorization) throws IOException {
        Map<String, Object> response = webClientService.post("Please draw a picture of people wearing swimsuits on the beach");
        List<Object> urlList = (List<Object>) response.get("data");

        int i = 1;

        for (Object urlObject : urlList) {
            Map<String, String> urlMap = (Map) urlObject;
            String url = urlMap.get("url");
            saveImageService.downloadImage(url, i++ + ".jpg");
        }
        return ResponseEntity.ok().body("저장 완료");
    }

    @GetMapping("/AI")
    public ResponseEntity<Map<String, Object>> getImage(@RequestHeader String Authorization){

//        UserDto user = authService.selectOneMember(HeaderUtil.getAccessTokenString(Authorization));
        return ResponseEntity.ok().body(webClientService.post("Please draw a picture of people wearing swimsuits on the beach"));
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

    @GetMapping("/get-user")
    public ResponseEntity<Object> getUser(@RequestBody String roomIdx){
        return ResponseEntity.ok().body(gameService.choiceUser(roomIdx));
    }

}
