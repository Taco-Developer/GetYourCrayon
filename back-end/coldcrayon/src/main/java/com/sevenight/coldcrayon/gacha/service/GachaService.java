package com.sevenight.coldcrayon.gacha.service;

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
public class GachaService {

    private final UserRepository userRepository;

    public ResponseDto gachaMain(Long userIdx) {
        Map<String, Object> result = new HashMap<>();
        ResponseDto responseDto = new ResponseDto();

        Optional<User> byUserIdx = userRepository.findByUserIdx(userIdx);
        if (byUserIdx.isEmpty()) {
            responseDto.setMessage("유저 Idx를 찾을 수 없음");
            responseDto.setStatusCode(400);
        } else {
            UserProfileDto userProfileDto = UserProfileDto.builder()
                    .userIdx(byUserIdx.get().getUserIdx())
                    .userNickname(byUserIdx.get().getUserNickname())
                    .userProfile(byUserIdx.get().getUserProfile())
                    .userPoint(byUserIdx.get().getUserPoint())
                    .build();
            
            result.put("profile", userProfileDto);
            responseDto.setMessage("유저 프로필 정보");
            responseDto.setStatusCode(200);
            responseDto.setBody(result);
        }

    return responseDto;
    }

    public ResponseDto gachaOnce(Long userIdx) {
        Map<String, Object> result = new HashMap<>();
        ResponseDto responseDto = new ResponseDto();

        Optional<User> byUserIdx = userRepository.findByUserIdx(userIdx);
        if (byUserIdx.isEmpty()) {
            responseDto.setMessage("유저 Idx를 찾을 수 없음");
            responseDto.setStatusCode(400);
        } else {
            int userPoint = byUserIdx.get().getUserPoint();
            if (userPoint >= 10) {
                // 뽑기 메서드 실행(for 한 개)
                responseDto.setMessage("1회 뽑기 실행");
                responseDto.setStatusCode(200);
            } else {
                responseDto.setMessage("1회 뽑기 포인트 부족");
                responseDto.setStatusCode(600);     // 유저 오류: 600번대
            }
        }
        return responseDto;
    }

    public ResponseDto gachaTenth(Long userIdx) {
        Map<String, Object> result = new HashMap<>();
        ResponseDto responseDto = new ResponseDto();

        Optional<User> byUserIdx = userRepository.findByUserIdx(userIdx);
        if (byUserIdx.isEmpty()) {
            responseDto.setMessage("유저 Idx를 찾을 수 없음");
            responseDto.setStatusCode(400);
        } else {
            int userPoint = byUserIdx.get().getUserPoint();
            if (userPoint >= 10) {
                // 뽑기 메서드 실행(for 열 개)
                responseDto.setMessage("10회 뽑기 실행");
                responseDto.setStatusCode(200);
            } else {
                responseDto.setMessage("1회 뽑기 포인트 부족");
                responseDto.setStatusCode(600);     // 유저 오류: 600번대
            }
        }
        return responseDto;
    }
}
