package com.sevenight.coldcrayon.room.service;

import com.sevenight.coldcrayon.auth.dto.UserDto;
import com.sevenight.coldcrayon.config.RedisMethods;
import com.sevenight.coldcrayon.game.entity.GameCategory;
import com.sevenight.coldcrayon.joinlist.service.JoinListService;
import com.sevenight.coldcrayon.room.dto.RoomResponseDto;
import com.sevenight.coldcrayon.room.dto.UserHashResponseDto;
import com.sevenight.coldcrayon.room.entity.RoomHash;
import com.sevenight.coldcrayon.room.entity.RoomStatus;
import com.sevenight.coldcrayon.room.entity.UserHash;
import com.sevenight.coldcrayon.room.repository.RoomRepository;
import com.sevenight.coldcrayon.room.repository.UserHashRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService{

    final RedisMethods redisMethods;
    final RoomRepository roomRepository;
    final JoinListService joinListService;
    final UserHashRepository userHashRepository;

    // 방 만들기
    public Map<String, Object> saveRoom(UserDto userDto){
        Map<String, Object> responseMap = new HashMap<>();
        if(userHashRepository.findById(userDto.getUserIdx()).isPresent()){
            responseMap.put("status", "fail");
            responseMap.put("message", "다른 방에 참여하고 있는 유저 입니다.");
        } else {
            String roomIdx = UUID.randomUUID().toString().replaceAll("-", "");
            UserHash userHash = UserHash.createUserHash(userDto, roomIdx);

            RoomHash roomHash = RoomHash.builder()
                    .roomIdx(roomIdx)
                    .gameCategory(GameCategory.AI)
                    .gameCnt(0)
                    .nowRound(0)
                    .maxRound(0)
                    .roomStatus(RoomStatus.Ready)
                    .roomMax(6)
                    .roomNow(1)
                    .adminUserIdx(userHash.getUserIdx())
                    .roomCreateTime(LocalDateTime.now())
                    .build();

            roomRepository.save(roomHash);
            joinListService.createJoinList(roomIdx, userHash.getUserIdx());
            userHashRepository.save(userHash);

            responseMap.put("status", "success");
            responseMap.put("roomIdx", roomIdx);
            responseMap.put("adminUserIdx", userDto.getUserIdx());

        }

        return responseMap;

    }

    // 방 조회하기
    public RoomResponseDto getRoom(String roomIdx){
        Optional<RoomHash> roomHashOptional = roomRepository.findById(roomIdx);
        if(roomHashOptional.isPresent()){
            return RoomResponseDto.of(roomHashOptional, "success", "방 정보입니다.");
        }
        return RoomResponseDto.of(roomHashOptional, "fail", "요청하신 방의 정보가 없습니다.");
    }

    // 방에 참여하기
    public RoomResponseDto joinRoom(UserDto userDto, String roomIdx){

        Optional<RoomHash> optionalRoomHash = roomRepository.findById(roomIdx);
        String status = "fail";
        String message;
        if(optionalRoomHash.isEmpty()){
            message = "조회하신 방이 없습니다.";
            return null;
        }

        RoomHash roomHash = optionalRoomHash.get();
        if(roomHash.getRoomStatus().equals(RoomStatus.Playing)){
            message = "게임중인 방에는 입장할 수 없습니다.";

        } else if(roomHash.getRoomMax() == roomHash.getRoomNow()){
            message = "방이 가득 찼습니다.";

        } else if(userHashRepository.findById(userDto.getUserIdx()).isPresent()){
            message = "다른 방에 참여중인 유저입니다.";

        } else {
            status = "success";
            message = "방의 정보 입니다.";
            UserHash userHash = UserHash.createUserHash(userDto, roomIdx);
            roomHash.setRoomNow(roomHash.getRoomNow()+1);

            userHashRepository.save(userHash);
            joinListService.createJoinList(roomIdx, userDto.getUserIdx());
            roomRepository.save(roomHash);
        }

        return RoomResponseDto.of(optionalRoomHash, status, message);
    }

    // 방에서 나가기
    public RoomResponseDto outRoom(UserDto userDto){
        // 방 정보 가지고 오기
        Optional<UserHash> userHash = userHashRepository.findById(userDto.getUserIdx());
        Optional<RoomHash> optionalRoomHash;
        String status = "fail";
        String message;

        if(userHash.isEmpty()){
            message = "유저가 게임방에 들어간 적이 없습니다.";
            optionalRoomHash = Optional.empty();
        } else {
            optionalRoomHash = roomRepository.findById(userHash.get().getRoomIdx());

            if(optionalRoomHash.isPresent()){


                RoomHash room = optionalRoomHash.get();

                if(room.getRoomNow() == 1){
                    status = "Success";
                    message = "방의 인원이 1명이라 방을 삭제합니다.";
                    roomRepository.deleteById(room.getRoomIdx()); // 방 삭제
                    redisMethods.removeList(room.getRoomIdx());   // 방에 참여 인원 List 삭제
                    userHashRepository.deleteById(userDto.getUserIdx());
                } else {
                    // 방장 위임
                    status = "success";
                    message = "방장을 위임합니다.";
                    if(room.getAdminUserIdx().equals(userDto.getUserIdx())){
                        List<Object> userList = redisMethods.getList(room.getRoomIdx());
                        int i=0;
                        while(userList.get(i).equals(userDto.getUserIdx().toString())){
                            i++;
                        }

                    RoomResponseDto roomResponseDto = this.changeAdminUser(userDto, room.getRoomIdx(), Long.parseLong(userList.get(i).toString()));
                    room.setAdminUserIdx(roomResponseDto.getAdminUserIdx());

                    }
                    room.setRoomNow(room.getRoomNow()-1); // 방 현재 인원 -1
                    redisMethods.removeElement(room.getRoomIdx(), userDto.getUserIdx()); //  방에 참여 인원 List에서 유저 삭제
                    userHashRepository.deleteById(userDto.getUserIdx());
                    roomRepository.save(room);
                }
            } else {
                message = "조회하신 방이 없습니다.";
            }
        }

        return RoomResponseDto.of(optionalRoomHash, status, message);
    }

    // 방장 위임
    public RoomResponseDto changeAdminUser(UserDto user, String roomIdx, Long toUserIdx){
        String status = "fail";
        String message;

        Optional<RoomHash> optionalRoomHash = roomRepository.findById(roomIdx);

        if(optionalRoomHash.isPresent()){
            RoomHash room = optionalRoomHash.get();

            // 방장이랑 유저 idx랑 다르면 되돌려보내기

            if(!user.getUserIdx().equals(room.getAdminUserIdx())){
                message = "방에 설정된 방장이 아닙니다.";
            } else{

                List<Object> userList = redisMethods.getList(roomIdx);

                if (userList.contains(toUserIdx + "")){ // 방장을 위임하는 유저가 있는 경우
                    status = "success";
                    room.setAdminUserIdx(toUserIdx);
                    roomRepository.save(room);
                    message = toUserIdx + " 에게 방장을 위임했습니다.";
                } else {
                    message = "위임하려는 유저가 없습니다.";
                }
            }


        } else {
            message = "요청하신 방의 정보가 없습니다.";
        }
        return RoomResponseDto.of(optionalRoomHash, status, message);
    }

    // 방의 최대 인원 수 변경하기
    public RoomResponseDto changeMaxUser(UserDto user, String roomIdx, int roomMax){
        String status = "fail";
        String message;
        Optional<RoomHash> optionalRoomHash = roomRepository.findById(roomIdx);

        if(optionalRoomHash.isEmpty()){
            message = "요청하신 방의 정보가 없습니다.";
        }

        RoomHash room = optionalRoomHash.get();
        if(!room.getAdminUserIdx().equals(user.getUserIdx())){
            message = "방장이 아닙니다.";
        } else if(room.getRoomNow() > roomMax){
            message = "제한된 인원보다 현재 인원이 많습니다.";
        } else if(roomMax>6){
            message = "최대 인원은 6명 까지입니다.";
        } else if(roomMax<3){
            message = "최소 3명의 인원이 필요합니다.";
        } else {
            status = "success";
            message = roomMax + "인원으로 변경했습니다.";
            room.setRoomMax(roomMax);
            roomRepository.save(room);
        }

        return RoomResponseDto.of(optionalRoomHash, status, message);
    }

    // 참여 인원 조회하기
    public List<UserHash> getUserList(String roomIdx){
        List<Object> userList = redisMethods.getList(roomIdx);
        List<UserHash> userHashList = new ArrayList<>();
        for(Object userIdx: userList){
            userHashList.add(userHashRepository.findById(Long.parseLong(userIdx.toString())).get());
        }
        return userHashList;
    }

    // U : 유저 차단
//    public String banUser(String roomIdx, String adminUserIdx, String banUserIdx){
//        Optional<RoomHash> optionalRoom = roomRepository.findById(roomIdx);
//        if(optionalRoom.isPresent()){
//            RoomHash room = optionalRoom.get();
//            if(room.getAdminUserIdx().equals(adminUserIdx)){
//                if(redisMethods.getList(roomIdx).contains(banUserIdx)){
//                    redisMethods.removeElement("user", banUserIdx);
//                    redisMethods.setList("kick"+roomIdx, banUserIdx);
//                }
//                else {
//                    // 유저가 없습니다
//                    return null;
//                }
//            } else {
//                // 권한이 없습니다.
//                return null;
//            }
//
//        }
//        return null;
//    }

}
