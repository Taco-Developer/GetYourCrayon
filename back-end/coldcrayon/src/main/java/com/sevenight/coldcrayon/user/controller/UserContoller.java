package com.sevenight.coldcrayon.user.controller;

import com.sevenight.coldcrayon.user.dto.ResponseDto;
import com.sevenight.coldcrayon.user.entity.User;
import com.sevenight.coldcrayon.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@Log4j2
@RequiredArgsConstructor
public class UserContoller {
    private final UserService userService;

    @PatchMapping
    public ResponseEntity<ResponseDto> changeUserNickname(@PathVariable String userNickname, String changeNickname) {
        log.info("유저 닉네임 변경 POST: /{userNickname}", userNickname);
        ResponseDto responseDto = userService.changeUserNickname(userNickname, changeNickname);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

}
