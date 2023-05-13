package com.sevenight.coldcrayon.room.service;

import com.sevenight.coldcrayon.auth.dto.UserDto;
import com.sevenight.coldcrayon.room.dto.RoomDto;
import com.sevenight.coldcrayon.room.entity.UserHash;

import java.util.List;

public interface RoomService {

    RoomDto getRoom(String roomIdx);

    RoomDto saveRoom(UserDto userDto);

    RoomDto joinRoom(UserDto userDto, String roomIdx);

    String outRoom(UserDto userDto);

    RoomDto changeAdminUser(UserDto user, String roomIdx, Long toUserIdx);

    RoomDto changeMaxUser(UserDto user, String roomIdx, int roomMax);

    List<UserHash> getUserList(String roomIdx);

    // 3-3 유저 차단
//    String banUser(String roomIdx, String adminUserIdx, String banUserIdx);


}
