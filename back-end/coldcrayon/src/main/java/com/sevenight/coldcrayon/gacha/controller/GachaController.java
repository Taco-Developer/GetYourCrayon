package com.sevenight.coldcrayon.gacha.controller;

import com.sevenight.coldcrayon.auth.dto.UserDto;
import com.sevenight.coldcrayon.auth.service.AuthService;
import com.sevenight.coldcrayon.gacha.service.GachaService;
import com.sevenight.coldcrayon.user.dto.ResponseDto;
import com.sevenight.coldcrayon.user.service.UserService;
import com.sevenight.coldcrayon.util.HeaderUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user/mypage")
@Log4j2
@RequiredArgsConstructor
public class GachaController {

    private final GachaService gachaService;

    private final AuthService authService;

    @GetMapping("/gacha/{userIdx}")
    public ResponseEntity<ResponseDto> gachaMain(@PathVariable Long userIdx) {
        log.info("갓챠 페이지 이동 GET: /{}", userIdx);
        ResponseDto responseDto = gachaService.gachaMain(userIdx);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    @PostMapping("/gacha/{userIdx}/once")
    public ResponseEntity<ResponseDto> gachaOnce(@PathVariable Long userIdx) {
        log.info("갓챠 한 번 뽑기 POST: /{}", userIdx);
        ResponseDto responseDto = gachaService.gachaOnce(userIdx);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }
    @PostMapping("/gacha/{userIdx}/tenth")
    public ResponseEntity<ResponseDto> gachaTenth(@PathVariable Long userIdx) {
        log.info("갓챠 열 번 뽑기 POST: /{}", userIdx);
        ResponseDto responseDto = gachaService.gachaTenth(userIdx);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }
    // --------------------------------------------------------------------------------


        @PostMapping("/gacha/test/once")
        public ResponseEntity<ResponseDto> once(@RequestHeader String Authorization) {
            UserDto user = authService.selectOneMember(HeaderUtil.getAccessTokenString(Authorization));
            log.info("갓챠 한 번 뽑기 POST: /{}", user.getUserIdx());
            ResponseDto responseDto = gachaService.gachaOnce(user.getUserIdx());
            return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
        }

        @PostMapping("/gacha/test/ten")
        public ResponseEntity<ResponseDto> ten(@RequestHeader String Authorization) {
            UserDto user = authService.selectOneMember(HeaderUtil.getAccessTokenString(Authorization));
            log.info("갓챠 한 번 뽑기 POST: /{}", user.getUserIdx());
            ResponseDto responseDto = gachaService.gachaTenth(user.getUserIdx());
            return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    // 1회 뽑기
//    @PostMapping("/gacha/once")
//    public ResponseEntity<?> once(@RequestHeader String Authorization) {
//        UserDto user = authService.selectOneMember(HeaderUtil.getAccessTokenString(Authorization));
//        log.info("유저 정보(1회 뽑기) = {}", user);
//
//
//        return null;
//    }

    // 10회 뽑기
//    @PostMapping("/gacha/once")
}
