package com.sevenight.coldcrayon.auth.controller;

import com.sevenight.coldcrayon.auth.dto.UserDto;
import com.sevenight.coldcrayon.auth.service.AuthService;
import com.sevenight.coldcrayon.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
@Slf4j
public class AuthController {
    private final AuthService userService;

    private final UserRepository userRepository;

    //    @PostMapping("/nickname")
    @PutMapping("/nickname")
//    public ResponseEntity<?> updateMember(@RequestBody String userEmail, String userNickname) {
    public ResponseEntity<?> updateMember(@RequestBody UserDto userDto) {
        System.out.println("user = " + userDto);
        log.info("회원 : {}", userDto);
        UserDto res = userService.updateNickname(userDto);
        if (res == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("회원정보 없음");
        }
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @PostMapping("/nicknamecheck")
    public ResponseEntity<?> selectOneUser(@RequestBody UserDto userDto) {
        log.debug("유저 닉네임 체크 호출 = {}", userDto);
        UserDto getUser = userService.selectOneMemberAllInfo(userDto);
        if (getUser == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("회원정보 없음");
        }
        return ResponseEntity.status(HttpStatus.OK).body(getUser);
    }
}
