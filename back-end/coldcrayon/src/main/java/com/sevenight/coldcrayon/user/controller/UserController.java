package com.sevenight.coldcrayon.user.controller;

import com.sevenight.coldcrayon.auth.dto.UserDto;
import com.sevenight.coldcrayon.auth.service.AuthService;
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
public class UserController {
    private final UserService userService;

    private final AuthService authService;

    //==도영이가 userId를 무엇으로 할지 결정하고 진행==//
    // 아래는 테스트용
    @GetMapping("/profile/{userIdx}")
    public ResponseEntity<ResponseDto> myPage(@PathVariable Long userIdx) {
        log.info("유저 페이지 이동 GET: /{}", userIdx);
        ResponseDto responseDto = userService.myPage(userIdx);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    @PutMapping("/profile/changenickname/{userIdx}/{newNickname}")
    public ResponseEntity<ResponseDto> changeUserNickname(@PathVariable Long userIdx,
                                                          @PathVariable String newNickname) {
        log.info("유저 닉네임 변경 PUT: /{}/{}", userIdx, newNickname);
        ResponseDto responseDto = userService.changeUserNickname(userIdx, newNickname);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }
//    @PutMapping("/profile/changeprofileimg/{userIdx}/{newProfileImg}")
//    public ResponseEntity<ResponseDto> changeUserProfileImg(@PathVariable Long userIdx,
//                                                            @PathVariable String newProfileImg) {
//        log.info("유저 프로필 변경 PUT: /{}/{}", userIdx, newProfileImg);
//        ResponseDto responseDto = userService.changeUserProfileImg(userIdx, newProfileImg);
//        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
//    }

    // =====================================================================================

    @GetMapping("/profile")
    public ResponseEntity<ResponseDto> goMyPage(@RequestHeader String Authorization) {
        UserDto user = authService.selectOneMember(HeaderUtil.getAccessTokenString(Authorization));

        log.info("유저 페이지 이동 GET: /{}", user.getUserIdx());
        ResponseDto responseDto = userService.myPage(user.getUserIdx());
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }

    @PutMapping("/profile/changeprofileimg/{newProfileImgIdx}")
    public ResponseEntity<ResponseDto> changeUserProfileImg(@RequestHeader String Authorization,
                                                            @PathVariable Long newProfileImgIdx) {
        UserDto user = authService.selectOneMember(HeaderUtil.getAccessTokenString(Authorization));

        log.info("유저, 변경 이미지 아이디 /{}/{}", user.getUserIdx(), newProfileImgIdx);
        ResponseDto responseDto = userService.changeUserProfileImg(user.getUserIdx(), newProfileImgIdx);
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }



}
