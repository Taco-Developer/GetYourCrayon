package com.sevenight.coldcrayon.room.service;

import com.sevenight.coldcrayon.config.RedisMethods;
import com.sevenight.coldcrayon.room.dto.RoomDto;
import com.sevenight.coldcrayon.room.entity.RoomHash;
import com.sevenight.coldcrayon.room.entity.RoomStatus;
import com.sevenight.coldcrayon.room.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
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

    // C : 방 저장하기
    public RoomDto saveRoom(String userIdx){

        String roomIdx = UUID.randomUUID().toString().replaceAll("-", "");

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

        return RoomDto.of(room);

    }

    // R : 방 정보 가지고 오기
    public RoomDto getRoom(String roomIdx){
        Optional<RoomHash> optionalRoomHash = roomRepository.findById(roomIdx);
        if(optionalRoomHash.isPresent()){
            return RoomDto.of(optionalRoomHash.get());
        } else {
            return null;
        }
    }

    //  R : 유저 정보를 가지고 현재 참여하고 있는 방 식별자를 반환한다.
    public Optional<String> checkUserRoom(String userIdx){
        return Optional.ofNullable((String) redisMethods.getHash("user", userIdx)) ;
    }

    // U : 방의 최대 인원 수 변경하기
    public RoomDto changeMaxUser(String roomIdx, String userIdx, int roomMax){
        Optional<RoomHash> optionalRoomHash = roomRepository.findById(roomIdx);
        if(optionalRoomHash.isPresent()){

            RoomHash room = optionalRoomHash.get();
            room.setRoomMax(roomMax);
            roomRepository.save(room);

            return RoomDto.of(room);
        } else {

            return null;

        }
    }

    // U : 방장 위임
    public RoomDto changeAdminUser(String roomIdx, String fromUserIdx, String toUserIdx){

        Optional<RoomHash> optionalRoom = roomRepository.findById(roomIdx);

        if(optionalRoom.isPresent()){
            RoomHash room = optionalRoom.get();
            List<String> userList = redisMethods.getList(roomIdx);
            if (userList.contains(toUserIdx)){ // 방장을 위임하는 유저가 있는 경우
                room.setAdminUserIdx(toUserIdx);
                roomRepository.save(room);
                return RoomDto.of(room);
            } else {
                // 위임하려는 유저가 없는 경우 exception 발생
                return null;
            }

        } else {

            // 없으면 에러 던져야한다.
            return null;

        }
    }

    // U : 유저 차단
    public String banUser(String roomIdx, String adminUserIdx, String banUserIdx){
        Optional<RoomHash> optionalRoom = roomRepository.findById(roomIdx);
        if(optionalRoom.isPresent()){
            RoomHash room = optionalRoom.get();
            if(room.getAdminUserIdx().equals(adminUserIdx)){
                if(redisMethods.getList(roomIdx).contains(banUserIdx)){
                    redisMethods.removeElement("user", banUserIdx);
                    redisMethods.setList("kick"+roomIdx, banUserIdx);
                }
                else {
                    // 유저가 없습니다
                    return null;
                }
            } else {
                // 권한이 없습니다.
                return null;
            }

        }
        return null;
    }

    public String removeUser(String roomIdx, String userIdx){
        // 방 정보 가지고 오기
        Optional<RoomHash> optionalRoom = roomRepository.findById(roomIdx);

        if(optionalRoom.isPresent()){
            RoomHash room = optionalRoom.get();

            if(room.getRoomNow() == 1){
                roomRepository.deleteById(roomIdx); // 방 삭제
                redisMethods.removeList(roomIdx);   // 방에 참여 인원 List 삭제
            } else {
                // 방장 위임
                if(room.getAdminUserIdx().equals(userIdx)){
                    List<String> userList = redisMethods.getList(roomIdx);
                    int i=0;
                    while(userList.get(i).equals(userIdx)){
                        i++;
                    }
                    RoomDto newRoomDto = changeAdminUser(roomIdx, userIdx, userList.get(i));
                    return newRoomDto.getRoomIdx();
                }
                room.setRoomNow(room.getRoomNow()-1); // 방 현재 인원 -1
                redisMethods.removeElement(room.getRoomIdx(), userIdx); //  방에 참여 인원 List에서 유저 삭제
                redisMethods.removeHash("user", userIdx);
            }
            return roomIdx;
        } else{
            throw new RuntimeException("방 정보가 존재하지 않습니다.");
        }
    }


}
