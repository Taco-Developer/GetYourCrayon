package com.sevenight.coldcrayon.game.controller;

import com.sevenight.coldcrayon.game.dto.ResponseGameDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/game")
@RequiredArgsConstructor
public class GameController {

    // 게임 시작 -> 테마 및 주제 랜덤으로 정해서 값 전달해주기!
    /*
    필요한 정보 : roomIdx, roomNow, Mode,
    보내줄 정보
        1. relay
            테마, 정답, 랜던 순서 배정
        2. catch
            테마, 정답, 그림 그리는 사람
        3. AI
            테마, 정답, 사진 4장
        4. LIAR
            테마, 정답, 라이어, 그림 그리는 랜덤 순서
        5. reverse
            테마, 정답, 정답 맞추는 사람
     */
    @PatchMapping("/start")
    public ResponseGameDto gameStart(){
        return null;
    }

}
