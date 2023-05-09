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

    public UserDto selectOneMemberAllInfo (UserDto userDto){
        String email = userDto.getUserEmail();
        return UserDto.of(userRepository.findByUserEmail(email));
    }
}
