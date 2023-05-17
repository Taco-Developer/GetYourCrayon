package com.sevenight.coldcrayon.room.service;

import com.sevenight.coldcrayon.auth.dto.UserDto;
import com.sevenight.coldcrayon.room.dto.RoomDto;
import com.sevenight.coldcrayon.room.dto.RoomResponseDto;
import com.sevenight.coldcrayon.room.dto.UserHashResponseDto;
import com.sevenight.coldcrayon.room.entity.UserHash;

import java.util.List;
import java.util.Map;

public interface RoomService {

    RoomResponseDto getRoom(String roomIdx);

    Map<String, Object> saveRoom(UserDto userDto);

    Map<String, Object> joinRoom(UserDto userDto, String roomIdx);

    RoomResponseDto outRoom(UserDto userDto);

    RoomResponseDto changeAdminUser(UserDto user, String roomIdx, Long toUserIdx);

    RoomResponseDto changeMaxUser(UserDto user, String roomIdx, int roomMax);

    List<UserHash> getUserList(String roomIdx);

    Map<String, Object> firstRoom(UserDto userDto, String roomIdx);

    // 게임 정답을 가장 먼저 맞힌 사람정보를 들고 온다.
    void CorrectUser(String roomIdx, Long userIdx);

    // 3-3 유저 차단
//    String banUser(String roomIdx, String adminUserIdx, String banUserIdx);


}
