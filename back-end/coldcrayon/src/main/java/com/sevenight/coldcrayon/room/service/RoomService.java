package com.sevenight.coldcrayon.room.service;

import com.sevenight.coldcrayon.room.dto.RoomDto;

import java.util.List;
import java.util.Optional;

public interface RoomService {

//     1. 유저 정보를 가지고 현재 참여하고 있는 방 식별자를 반환한다.
    Optional<String> checkUserRoom(String userIdx);
//
//    // 2. 유저가 참여하고 있는 방에서 유저를 제거한다.
    String removeUser(String roomIdx, String userIdx);

    // 3. 새로운 방 idx를 만든다.
    String createRoomIdx();

    // 4. Redis에 방 정보를 저장한다.
    String saveRoom(String roomIdx, String userIdx);

}
