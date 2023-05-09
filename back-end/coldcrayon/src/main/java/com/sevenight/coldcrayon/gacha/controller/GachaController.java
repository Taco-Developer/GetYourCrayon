package com.sevenight.coldcrayon.gacha.controller;

import com.sevenight.coldcrayon.gacha.service.GachaService;
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
public class GachaController {

    private final GachaService gachaService;

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
}
