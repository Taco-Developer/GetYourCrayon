package com.sevenight.coldcrayon.user.service;

import com.sevenight.coldcrayon.user.dto.ResponseDto;
import com.sevenight.coldcrayon.user.entity.User;
import com.sevenight.coldcrayon.user.repository.UserRepository;
import io.swagger.models.Response;
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

    public ResponseDto changeUserNickname(String userNickname, String changeNickname) {
        Map<String, Object> result = new HashMap<>();
        ResponseDto responseDto = new ResponseDto();

        Optional<User> byUserNickname = userRepository.findByUserNickname(userNickname);
        if (byUserNickname.isEmpty()) {
            responseDto.setMessage("유저 닉네임을 찾을 수 없음");
            responseDto.setStatusCode(400);
        } else {
            User user = byUserNickname.get();
            user.setUserNickname(changeNickname);
            userRepository.save(user);
            responseDto.setMessage("기존 유저 닉네임: " + userNickname + "에서 " + changeNickname + "으로 변경 완료");
            responseDto.setStatusCode(200);
        }

        return responseDto;
    }
}
