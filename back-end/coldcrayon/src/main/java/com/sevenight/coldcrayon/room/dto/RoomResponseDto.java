package com.sevenight.coldcrayon.room.dto;

import com.sevenight.coldcrayon.game.entity.GameCategory;
import com.sevenight.coldcrayon.room.entity.RoomStatus;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Optional;

import com.sevenight.coldcrayon.room.entity.RoomHash;

@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomResponseDto {
    private String roomIdx;
    // fail, success 중에 하나,
    private String status;
    // fail 원인 상세하게 적어주기
    private String message;

    // 게임 카테고리
    private GameCategory gameCategory;

    // 지금 라운드
    private int nowRound;

    // 최대 라운드
    private int maxRound;

    // 방장 유저의 식별자
    private Long adminUserIdx;

    // 방 상태
    private RoomStatus roomStatus;

    // 방의 최대 인원 수
    private int roomMax;

    // 방의 현재 인원 수
    private int roomNow;


    static public RoomResponseDto of(Optional<RoomHash> optionalRoomHash, String status, String message){
        RoomResponseDto roomResponseDto = new RoomResponseDto();

        if(status.equals("success")){
            RoomHash room = optionalRoomHash.get();
            roomResponseDto.roomIdx = room.getRoomIdx();
            roomResponseDto.gameCategory = room.getGameCategory();
            roomResponseDto.nowRound = room.getNowRound();
            roomResponseDto.maxRound = room.getMaxRound();
            roomResponseDto.roomMax = room.getRoomMax();
            roomResponseDto.roomNow = room.getRoomNow();
            roomResponseDto.adminUserIdx = room.getAdminUserIdx();
            roomResponseDto.roomStatus = room.getRoomStatus();
        }

        roomResponseDto.status = status;
        roomResponseDto.message = message;

        return roomResponseDto;
    }
}
