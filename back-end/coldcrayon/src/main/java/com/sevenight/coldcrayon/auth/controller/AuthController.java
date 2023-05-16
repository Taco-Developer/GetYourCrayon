package com.sevenight.coldcrayon.auth.controller;

import com.sevenight.coldcrayon.auth.dto.UserDto;
import com.sevenight.coldcrayon.auth.dto.UserResponseDto;
import com.sevenight.coldcrayon.auth.service.AuthService;
import com.sevenight.coldcrayon.user.repository.UserRepository;
import com.sevenight.coldcrayon.util.HeaderUtil;
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
    private final AuthService authService;

    private final UserRepository userRepository;

    //    @PostMapping("/nickname")
//    @PutMapping("/nickname")
////    public ResponseEntity<?> updateMember(@RequestBody String userEmail, String userNickname) {
//    public ResponseEntity<?> updateMember(@RequestBody UserDto userDto) {
//        System.out.println("user = " + userDto);
//        log.info("회원 : {}", userDto);
//        UserDto res = authService.updateNickname(userDto);
//        if (res == null) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("회원정보 없음");
//        }
//        return ResponseEntity.status(HttpStatus.OK).body(res);
//    }

    @PutMapping("/nickname")
    public ResponseEntity<?> chageNickname(@RequestHeader String Authorization, @RequestBody UserDto userDto) {
//        log.info("들어오는 닉네임 체크 = {}",nickname);
        UserDto realUser = authService.selectOneMember(HeaderUtil.getAccessTokenString(Authorization));
        String nickname = userDto.getUserNickname();
        log.info("nickname : {}", nickname);
        if (realUser == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("회원정보 없음");
        }
        // 서비스에 유저 정보, 닉네임 정보 던져줌
        UserDto res = authService.changeNickname(realUser, nickname);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @GetMapping("/myinfo")
    public ResponseEntity<?> getMyInfo(@RequestHeader String Authorization) {
        UserResponseDto realUser = authService.selectUser(HeaderUtil.getAccessTokenString(Authorization));
        log.info("realUser(유저 정보 확인을 위한 API) = {}",realUser);
        if (realUser == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("회원정보 없음");
        }
        return ResponseEntity.ok().body(realUser);
    }



//    @PostMapping("/test")
//    public ResponseEntity<?> test(@RequestHeader String Authorization) {
//        UserDto user = authService.selectOneMember(HeaderUtil.getAccessTokenString(Authorization));
//    }

//    @PostMapping("/nicknamecheck")
//    public ResponseEntity<?> selectOneUser(@RequestBody UserDto userDto) {
//        log.debug("유저 닉네임 체크 호출 = {}", userDto);
//        UserDto getUser = userService.selectOneMemberAllInfo(userDto);
//        if (getUser == null) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("회원정보 없음");
//        }
//        return ResponseEntity.status(HttpStatus.OK).body(getUser);
//    }
}
