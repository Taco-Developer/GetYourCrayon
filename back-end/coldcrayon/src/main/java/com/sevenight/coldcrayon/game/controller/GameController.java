package com.sevenight.coldcrayon.game.controller;

import com.sevenight.coldcrayon.auth.dto.UserDto;
import com.sevenight.coldcrayon.auth.service.AuthService;
import com.sevenight.coldcrayon.game.dto.GameRequestDto;
import com.sevenight.coldcrayon.game.entity.GameCategory;
import com.sevenight.coldcrayon.game.service.GameService;
import com.sevenight.coldcrayon.theme.entity.ThemeCategory;
import com.sevenight.coldcrayon.util.HeaderUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/game")
@RequiredArgsConstructor
public class GameController {

    final GameService gameService;
    final AuthService authService;

    @PatchMapping("/start")
    public ResponseEntity<ThemeCategory[]> gameStart(@RequestHeader String Authorization, @RequestBody GameRequestDto gameRequestDto) {
        // 에러는 못 던진다.....
//        UserDto user = authService.selectOneMember(HeaderUtil.getAccessTokenString(Authorization));
        UserDto user = UserDto.builder().userIdx(1L).userEmail("1번@naver.com").userPoint(0).userNickname("바보").build();

        return ResponseEntity.ok().body(gameService.startGame(user,gameRequestDto.getRoomIdx(), gameRequestDto.getGameCategory()));
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
