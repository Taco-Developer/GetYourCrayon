package com.sevenight.coldcrayon.game.service;

import com.sevenight.coldcrayon.game.dto.ResponseGameDto;
import com.sevenight.coldcrayon.room.entity.RoomHash;
import com.sevenight.coldcrayon.room.entity.RoomStatus;
import com.sevenight.coldcrayon.room.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GameServiceImpl implements GameService{

    RoomRepository roomRepository;

    public ResponseGameDto startGame(String roomIdx, String userIdx){
        Optional<RoomHash> optionalRoomHash = roomRepository.findById(roomIdx);
        if(optionalRoomHash.isPresent()){
            RoomHash room = optionalRoomHash.get();
            // 방장인지 확인
            if(!room.getAdminUserIdx().equals(userIdx)){
                return null;
            // 방의 인원이 3명 이하나, 게임이 시작한 방인지 확인하기
            } else if (room.getRoomNow() < 3 && !room.getRoomStatus().equals(RoomStatus.Ready)){
                return null;
            }
            //

            room.setRoomStatus(RoomStatus.Playing);





            return null;

        } else{
            return null;
//                    new throw RuntimeException("방이 없어요...");
        }
    }

}
