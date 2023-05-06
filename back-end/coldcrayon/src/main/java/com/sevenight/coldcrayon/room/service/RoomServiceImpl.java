package com.sevenight.coldcrayon.room.service;

import com.sevenight.coldcrayon.config.RedisMethods;
import com.sevenight.coldcrayon.room.entity.Room;
import com.sevenight.coldcrayon.room.entity.RoomHash;
import com.sevenight.coldcrayon.room.entity.RoomStatus;
import com.sevenight.coldcrayon.room.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService{

    final RedisMethods redisMethods;
    final RoomRepository roomRepository;


//     1. 유저 정보를 가지고 현재 참여하고 있는 방 식별자를 반환한다.
    public Optional<String> checkUserRoom(String userIdx){
        return Optional.ofNullable(redisMethods.getHash("user", userIdx)) ;
    }

    // 2. 유저가 참여하고 있는 방에서 유저를 제거한다.
    // 2.1 방장이 아닌 경우
    // 2.2 방장인 경우
    public String removeUser(String roomIdx, String userIdx){
        // 방 정보 가지고 오기
        RoomHash room = roomRepository.findById(roomIdx).get();


        if(room.getRoomNow() == 1) {    // 방에 1명이면 방 없애기
            roomRepository.deleteById(roomIdx);
            redisMethods.removeList(roomIdx);
        } else {
            // 이전에 입장한 방의 현재 인원 수를 줄이고, 방에서 유저 삭제하기
            room.setRoomNow(room.getRoomNow()-1);


            if(room.getAdminIdx().equals(userIdx)){ // 방장이면 다른 사람한테 위임하기
            }

        }
        return roomIdx;
    }

    // 3. 새로운 방 idx를 만든다.
    public String createRoomIdx(){
        return UUID.randomUUID().toString().replaceAll("-", "");
    }


    // 4. Redis에 방 정보와 userjoinlist, user, 방 정보를 저장한다.
    public String saveRoom(String roomIdx, String userIdx){
        redisMethods.setHash("user", userIdx, roomIdx);
        redisMethods.setList(roomIdx, userIdx);

        RoomHash room = RoomHash.builder()
                .roomIdx(roomIdx)
                .gameIdx("RELAY")
                .roomStatus(RoomStatus.Ready)
                .roomMax(6)
                .roomNow(1)
                .roomCreateTime(LocalDateTime.now())
                .build();
        roomRepository.save(room);
        return roomIdx;
    }

}
