package com.sevenight.coldcrayon.config;

import com.sevenight.coldcrayon.auth.dto.UserDto;
import com.sevenight.coldcrayon.joinlist.entity.Joinlist;
import com.sevenight.coldcrayon.joinlist.repository.JoinListRepository;
import com.sevenight.coldcrayon.room.dto.RoomDto;
import com.sevenight.coldcrayon.room.entity.Room;
import com.sevenight.coldcrayon.room.entity.RoomHash;
import com.sevenight.coldcrayon.room.repository.RoomRepository;
import com.sevenight.coldcrayon.room.service.RoomService;
import com.sevenight.coldcrayon.user.entity.User;
import com.sevenight.coldcrayon.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class WebSocketCustomService {

    private JoinListRepository joinListRepository;
    private RoomRepository roomRepository;
    private UserRepository userRepository;
    private RoomService roomService;

    public boolean checkEnableEnter(String roomId) {
        boolean enable = false;

        RoomDto roomDto = roomService.getRoom(roomId);
        int roomMax = roomDto.getRoomMax();
        int roomNow = roomDto.getRoomNow();

        if (roomNow < roomMax) {
            enable = true;
        }
        return enable;
    }

    public void userRoomIn(String roomId, Long userIdx) {
        Optional<User> byUserIdx = userRepository.findByUserIdx(userIdx);
        if (byUserIdx.isEmpty()) {
            log.error("Long userIdx로 유저 정보를 조회할 수 없음");
        } else {
            Optional<RoomHash> room = roomRepository.findById(roomId);
            Optional<User> user = userRepository.findByUserIdx(userIdx);

            Joinlist joinlist = Joinlist.builder()
//                    .joinlistIdx()  // 백엔드 질문: userJoinListIdx는 autoincrement 설정이 필요하지 않나?
                    .room(room)     // 수민질문: Room타입이 필요한 상황, RoomHash를 Room으로 전환?
                    .user(user)
                    .build();
            joinListRepository.save(joinlist);
        }
    }

    public UserDto makeUserDto(Long userIdx) {
        // User객체 찾아오면 of 메서드로 만들 수 있음//
        Optional<User> byUserIdx = userRepository.findByUserIdx(userIdx);
        UserDto userDto = UserDto.of(byUserIdx.get());
        return userDto;
    }

}
