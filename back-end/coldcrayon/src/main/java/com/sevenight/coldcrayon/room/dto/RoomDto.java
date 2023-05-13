package com.sevenight.coldcrayon.room.dto;

import com.sevenight.coldcrayon.game.entity.GameCategory;
import com.sevenight.coldcrayon.room.entity.RoomStatus;
import lombok.*;

import java.time.LocalDateTime;

import com.sevenight.coldcrayon.room.entity.RoomHash;

@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomDto {

    // 방 식별자 = 주소
    private String roomIdx;

    // 게임 카테고리
    private GameCategory gameCategory;

    // 몇 번째 게임인지
    private int gameCnt;

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

    // 방 생성 시각
    private LocalDateTime roomCreateTime;



    static public RoomDto of(RoomHash room){
        RoomDto roomDto = new RoomDto();
        roomDto.roomIdx = room.getRoomIdx();
        roomDto.gameCategory = room.getGameCategory();
        roomDto.gameCnt = room.getGameCnt();
        roomDto.nowRound = room.getNowRound();
        roomDto.maxRound = room.getMaxRound();
        roomDto.roomMax = room.getRoomMax();
        roomDto.roomNow = room.getRoomNow();
        roomDto.roomCreateTime = room.getRoomCreateTime();
        roomDto.adminUserIdx = room.getAdminUserIdx();
        roomDto.roomStatus = room.getRoomStatus();
        return roomDto;
    }
}
