package com.sevenight.coldcrayon.user.service;

import com.sevenight.coldcrayon.user.dto.ResponseDto;
import com.sevenight.coldcrayon.user.dto.UserProfileDto;
import com.sevenight.coldcrayon.user.entity.User;
import com.sevenight.coldcrayon.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public ResponseDto myPage(Long userIdx) {
        Map<String, Object> result = new HashMap<>();
        ResponseDto responseDto = new ResponseDto();

        Optional<User> byUserIdx = userRepository.findByUserIdx(userIdx);
        if (byUserIdx.isEmpty()) {
            responseDto.setMessage("유저 Idx를 찾을 수 없음");
            responseDto.setStatusCode(400);
        } else {
            UserProfileDto userProfileDto= UserProfileDto.builder()
                    .userIdx(byUserIdx.get().getUserIdx())
                    .userNickname(byUserIdx.get().getUserNickname())
                    .userProfile(byUserIdx.get().getUserProfile())
                    .build();

            result.put("userProfileDto", userProfileDto);
            responseDto.setMessage("유저 프로필 정보");
            responseDto.setBody(userProfileDto);
            responseDto.setStatusCode(200);
        }
        return responseDto;
    }

    public ResponseDto changeUserNickname(Long userIdx, String changeNickname) {
        ResponseDto responseDto = new ResponseDto();

        Optional<User> byUserNickname = userRepository.findByUserIdx(userIdx);
        if (byUserNickname.isEmpty()) {
            responseDto.setMessage("유저 정보를 찾을 수 없음");
            responseDto.setStatusCode(400);
        } else {
            User user = byUserNickname.get();
            user.setUserNickname(changeNickname);
            userRepository.save(user);
            responseDto.setMessage("유저 인덱스 번호: " + userIdx + "번 유저의 닉네임을 " + changeNickname + "으로 변경");
            responseDto.setStatusCode(200);
        }
        return responseDto;
    }
    public ResponseDto changeUserProfileImg(long userIdx, String newProfileImg) {
        ResponseDto responseDto = new ResponseDto();

        Optional<User> byUserNickname = userRepository.findByUserIdx(userIdx);
        if (byUserNickname.isEmpty()) {
            responseDto.setMessage("유저 정보을 찾을 수 없음");
            responseDto.setStatusCode(400);
        } else {
            User user = byUserNickname.get();
            user.setUserProfile(newProfileImg);
            userRepository.save(user);
            responseDto.setMessage("유저 인덱스 번호: " + userIdx + "번 유저의 프로필 사진을 " + newProfileImg + "으로 변경");
            responseDto.setStatusCode(200);
        }
        return responseDto;
    }
}
