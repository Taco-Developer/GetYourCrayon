package com.sevenight.coldcrayon.user.controller;

import com.sevenight.coldcrayon.user.dto.ResponseDto;
import com.sevenight.coldcrayon.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/mypage")
@Log4j2
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    //==도영이가 userId를 무엇으로 할지 결정하고 진행==//
    // 아래는 테스트용
    @GetMapping("/profile/{userIdx}")
    public ResponseEntity<ResponseDto> mypage(@PathVariable Long userIdx) {
        log.info("유저 페이지 이동 GET: /{userIdx}", userIdx);
        ResponseDto responseDto = userService.myPage(userIdx);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    @PutMapping("/profile/change/{userIdx}/{changeNickname}")
    public ResponseEntity<ResponseDto> changeUserNickname(@PathVariable Long userIdx, String newNickname) {
        log.info("유저 닉네임 변경 PUT: /{userIdx}/{newNickname}", userIdx, newNickname);
        ResponseDto responseDto = userService.changeUserNickname(userIdx, newNickname);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

}
