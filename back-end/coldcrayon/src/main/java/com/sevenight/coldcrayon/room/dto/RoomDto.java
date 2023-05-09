package com.sevenight.coldcrayon.room.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

import com.sevenight.coldcrayon.room.entity.RoomHash;

@Getter @Setter
@NoArgsConstructor
public class RoomDto {

    // 방 식별자 = 주소
    private String roomIdx;

    // 방의 최대 인원 수
    private int roomMax;

    // 방의 현재 인원 수
    private int roomNow;

    // 방 생성 시각
    private LocalDateTime roomCreateTime;

    // 방장 유저의 식별자
    private String adminUserIdx;

    static public RoomDto of(RoomHash room){
        RoomDto roomDto = new RoomDto();
        roomDto.roomIdx = room.getRoomIdx();
        roomDto.roomMax = room.getRoomMax();
        roomDto.roomNow = room.getRoomNow();
        roomDto.roomCreateTime = room.getRoomCreateTime();
        roomDto.adminUserIdx = room.getAdminUserIdx();
        return roomDto;
    }
}
