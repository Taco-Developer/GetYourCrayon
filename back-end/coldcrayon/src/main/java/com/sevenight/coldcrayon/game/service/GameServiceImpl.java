package com.sevenight.coldcrayon.game.service;

import com.sevenight.coldcrayon.game.dto.ResponseGameDto;
import com.sevenight.coldcrayon.game.entity.GameCategory;
import com.sevenight.coldcrayon.room.entity.RoomHash;
import com.sevenight.coldcrayon.room.entity.RoomStatus;
import com.sevenight.coldcrayon.room.repository.RoomRepository;
import com.sevenight.coldcrayon.theme.entity.ThemeCategory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GameServiceImpl implements GameService{

    RoomRepository roomRepository;

    public ThemeCategory[] startGame(String roomIdx, String userIdx){

        Optional<RoomHash> optionalRoomHash = roomRepository.findById(roomIdx);
        if(optionalRoomHash.isEmpty()){
            return null;
        }
        RoomHash room = optionalRoomHash.get();

        // 방장인지 확인
        if(!room.getAdminUserIdx().equals(userIdx)){
            return null;
        }
        // 방의 인원이 3명 이하나, 게임이 시작한 방인지 확인하기
        if (room.getRoomNow() < 3 && !room.getRoomStatus().equals(RoomStatus.Ready)){
            return null;
        }

        //

        room.setRoomStatus(RoomStatus.Playing);

        return ThemeCategory.values();
    }

    public String getThemeKeyword(ThemeCategory theme){

        // JPA로 "keyword 중에서 theme과 일치하는 data를 들고오기"
        // 받아온 키워드 던져주기

        return null;
    }
}
