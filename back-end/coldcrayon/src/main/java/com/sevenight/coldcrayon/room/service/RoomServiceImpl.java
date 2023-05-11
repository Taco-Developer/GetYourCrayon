package com.sevenight.coldcrayon.room.service;

import com.sevenight.coldcrayon.auth.dto.UserDto;
import com.sevenight.coldcrayon.config.RedisMethods;
import com.sevenight.coldcrayon.game.entity.GameCategory;
import com.sevenight.coldcrayon.joinlist.service.JoinListService;
import com.sevenight.coldcrayon.room.dto.RoomDto;
import com.sevenight.coldcrayon.room.entity.RoomHash;
import com.sevenight.coldcrayon.room.entity.RoomStatus;
import com.sevenight.coldcrayon.room.entity.UserHash;
import com.sevenight.coldcrayon.room.repository.RoomRepository;
import com.sevenight.coldcrayon.room.repository.UserHashRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.rmi.ServerError;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService{

    final RedisMethods redisMethods;
    final RoomRepository roomRepository;
    final JoinListService joinListService;
    final UserHashRepository userHashRepository;

    // 방 조회하기
    public RoomDto getRoom(String roomIdx){
        Optional<RoomHash> roomHashOptional = roomRepository.findById(roomIdx);
        if(roomHashOptional.isEmpty()){
            return null; // 방이 없습니다.
        }
        return RoomDto.of(roomHashOptional.get());
    }

    // 방 만들기
    public RoomDto saveRoom(UserDto userDto){

        if(userHashRepository.findById(userDto.getUserIdx()).isPresent()){
            return null;
        }
        String roomIdx = UUID.randomUUID().toString().replaceAll("-", "");
        UserHash userHash = UserHash.createUserHash(userDto, roomIdx);

        RoomHash room = RoomHash.builder()
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

        roomRepository.save(room);
        joinListService.createJoinList(roomIdx, userHash.getUserIdx());
        userHashRepository.save(userHash);

        return RoomDto.of(room);

    }

    // 방에 참여하기
    public RoomDto joinRoom(UserDto userDto, String roomIdx){

        Optional<RoomHash> optionalRoomHash = roomRepository.findById(roomIdx);

        if(optionalRoomHash.isEmpty()){
            System.err.println("1번 null에서 걸러짐");
            return null; // 방이 없습니다.
        }

        RoomHash roomHash = optionalRoomHash.get();
        if(roomHash.getRoomStatus().equals(RoomStatus.Playing)){
            System.err.println("게임중인 방에는 입장할 수 없습니다.");
            return null; // 게임중인 방에는 입장할 수 없습니다.
        }
        if(roomHash.getRoomMax() == roomHash.getRoomNow()){
            System.err.println("방이 가득 찼습니다.");
            return null; // 방이 가득 찼습니다.
        }

        if(userHashRepository.findById(userDto.getUserIdx()).isPresent()){
            System.err.println("다른 방에 참여중인 유저입니다.");
            return null; // 다른 방에 참여중인 유저입니다.
        }
        System.err.println("안 걸러짐");
        UserHash userHash = UserHash.createUserHash(userDto, roomIdx);

        roomHash.setRoomNow(roomHash.getRoomNow()+1);


        userHashRepository.save(userHash);
        joinListService.createJoinList(roomIdx, userDto.getUserIdx());
        roomRepository.save(roomHash);

        return RoomDto.of(roomHash);
    }

    // 방에서 나가기
    public String outRoom(UserDto userDto){
        // 방 정보 가지고 오기
        Optional<UserHash> userHash = userHashRepository.findById(userDto.getUserIdx());

        if(userHash.isEmpty()){
            System.err.println("유저가 참여한 방이 없습니다.");
            return null; // 참여한 방이 없습니다.
        }

        Optional<RoomHash> optionalRoomHash = roomRepository.findById(userHash.get().getRoomIdx());

        if(optionalRoomHash.isPresent()){
            RoomHash room = optionalRoomHash.get();

            if(room.getRoomNow() == 1){
                System.err.println("방의 인원이 1명이라 방을 삭제합니다");
                roomRepository.deleteById(room.getRoomIdx()); // 방 삭제
                redisMethods.removeList(room.getRoomIdx());   // 방에 참여 인원 List 삭제
                userHashRepository.deleteById(userDto.getUserIdx());
            } else {
                // 방장 위임
                System.err.println("방장 위임 로직 전");
                if(room.getAdminUserIdx().equals(userDto.getUserIdx())){
                    System.err.println("방장 위임 로직에 들어옴");
                    List<Object> userList = redisMethods.getList(room.getRoomIdx());
                    int i=0;
                    System.err.println("user 수 : " + userList.size());
                    System.err.println("진입 => " + userDto.getUserIdx() + " : " + userList.get(i));
                    while(userList.get(i).equals(userDto.getUserIdx().toString())){
                        System.err.println("while => " +userDto.getUserIdx() + " : " + userList.get(i));
                        i++;
                    }
                    System.err.println("방장 위임하러 가요");
                    RoomDto newRoonDto = this.changeAdminUser(userDto, room.getRoomIdx(), Long.parseLong(userList.get(i).toString()));
                    room.setAdminUserIdx(newRoonDto.getAdminUserIdx());
                    System.err.println("방장 위임하고 왔어요");
                }
                room.setRoomNow(room.getRoomNow()-1); // 방 현재 인원 -1
                redisMethods.removeElement(room.getRoomIdx(), userDto.getUserIdx()); //  방에 참여 인원 List에서 유저 삭제
                userHashRepository.deleteById(userDto.getUserIdx());
                roomRepository.save(room);
            }
            return room.getRoomIdx();
        }
        System.err.println("유저에 등록된 방이 사라졌습니다.");
        return null;
    }


    // 방장 위임
    public RoomDto changeAdminUser(UserDto user, String roomIdx, Long toUserIdx){
        System.err.println("여기는 changeAdminUser입니다.");
        Optional<RoomHash> optionalRoom = roomRepository.findById(roomIdx);

        if(optionalRoom.isPresent()){
            System.err.println("방이 있어요");
            RoomHash room = optionalRoom.get();

            // 방장이랑 유저 idx랑 다르면 되돌려보내기

            if(!user.getUserIdx().equals(room.getAdminUserIdx())){
                System.err.println("방에 설정된 방장이 아닙니다.");
                return null; // 방에 설정된 방장이 아닙니다.
            }

            System.err.println("방장이 동일합니다.");
            List<Object> userList = redisMethods.getList(roomIdx);

            System.err.println(toUserIdx + " 에게 방장을 위임하려고 합니다.");
            if (userList.contains(toUserIdx + "")){ // 방장을 위임하는 유저가 있는 경우
                System.err.println("수정 전 room \n" + room);
                room.setAdminUserIdx(toUserIdx);
                roomRepository.save(room);
                System.err.println("수정 후 room \n" + room);
                System.err.println(toUserIdx + " 에게 방장을 위임했습니다.");
                return RoomDto.of(room);
            } else {
                System.err.println("위임하려는 유저가 없습니다.");
                return null; // 위임하려는 유저가 없습니다.
            }

        } else {
            System.err.println("방이 없습니다.");
            return null; // 방이 없습니다.
        }
    }

    // 방의 최대 인원 수 변경하기
    public RoomDto changeMaxUser(UserDto user, String roomIdx, int roomMax){
        Optional<RoomHash> optionalRoomHash = roomRepository.findById(roomIdx);
        if(optionalRoomHash.isEmpty()){
            System.err.println("방이 없습니다.");
            return null; // 방이 없습니다.
        }

        RoomHash room = optionalRoomHash.get();
        if(!room.getAdminUserIdx().equals(user.getUserIdx())){
            System.err.println("방장이 아닙니다.");
            return null; // 방장이 아닙니다.
        }

        if(room.getRoomNow() > roomMax){
            System.err.println("제한된 인원보다 현재 인원이 많습니다.");
            return null; // 제한된 인원보다 현재 인원이 많습니다.
        }

        if(roomMax>6){
            System.err.println("최대 인원은 6명 까지입니다.");
            return null; // 최대 인원은 6명 까지입니다.
        }

        if(roomMax<3){
            System.err.println("최소 3명의 인원이 필요합니다.");
            return null; // 최대 인원은 6명 까지입니다.
        }

        room.setRoomMax(roomMax);
        roomRepository.save(room);

        return RoomDto.of(room);
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
