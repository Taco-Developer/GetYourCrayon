package com.sevenight.coldcrayon.room.service;

import com.sevenight.coldcrayon.room.dto.RoomDto;

import java.util.List;
import java.util.Optional;

public interface RoomService {

    // 1. 방 정보를 저장한다.
    RoomDto saveRoom(String userIdx);

    // 2-1. 방 정보를 가지고 온다.
    RoomDto getRoom(String roomIdx);

    //  2-2. 유저가 참여하고 있는 방 Idx를 반환한다.
    Optional<String> checkUserRoom(String userIdx);

    // 3-1. 방 최대 인원 수 변경
    RoomDto changeMaxUser(String roomIdx, String userIdx, int roomMax);

    // 3-2. 방장 위임
    RoomDto changeAdminUser(String roomIdx, String fromUserIdx, String toUserIdx);

    // 3-3 유저 차단
    String banUser(String roomIdx, String adminUserIdx, String banUserIdx);

    // 4. 방 나가기
    String removeUser(String roomIdx, String userIdx);

}
