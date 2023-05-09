package com.sevenight.coldcrayon.auth.service;

import com.sevenight.coldcrayon.auth.dto.UserDto;
import com.sevenight.coldcrayon.user.entity.User;
import com.sevenight.coldcrayon.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final TokenService tokenservice;

    public List<UserDto> findAllUser(){
        return userRepository.findAll()
                .stream()
                .map(UserDto::of)
                .collect(Collectors.toList());
    }

    public UserDto findUser(String token) {
        String email = tokenservice.getEmail(token);
        return UserDto.of(userRepository.findByUserEmail(email));
    }

    @Modifying
    public UserDto updateNickname(UserDto userDto) {
        User getUser = userRepository.findByUserEmail(userDto.getUserEmail());
        System.out.println("getUser = " + getUser);
        getUser.setUserNickname(userDto.getUserNickname());
        System.out.println("______________________________________________");
        System.out.println("getUser = " + getUser);
        System.out.println("______________________________________________");

        log.debug("getUser = {}", getUser);
        return UserDto.of(userRepository.saveAndFlush(getUser));
    }


    /**
     * 토큰을 가지고 한명의 유저를 가져옵니다
     * 해당 로직을 Authorization 이 필요한 모든 로직에서 사용할 수 있습니다
     * 사용 방법은 다음과 같습니다
     * 0.  private final AuthService authService; 서비스를 DI 합니다
     * 1. 컨트롤러 생성
     * 2. @RequestHeader String Authorization 를 무조건 삽입
     * 3. UserDto user = authService.selectOneMember(HeaderUtil.getAccessTokenString(Authorization));
     * 4. user 가 해당 유저가 됩니다
     * */


    public UserDto selectOneMember(String token) {
        String email = tokenservice.getEmail(token);
        return UserDto.of(userRepository.findByUserEmail(email));
    }

    // 본인의 모든 정보가 필요할때 사용합니다
    public UserDto selectOneMemberAllInfo (String token){
        String email = tokenservice.getEmail(token);
        return UserDto.of(userRepository.findByUserEmail(email));
    }

    // 중복체크를 위해 모든 닉네임을 가져옵니다

}
