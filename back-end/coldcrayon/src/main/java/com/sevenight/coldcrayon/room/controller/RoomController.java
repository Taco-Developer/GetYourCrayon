package com.sevenight.coldcrayon.room.controller;


import com.sevenight.coldcrayon.room.service.RoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/game")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @PostMapping("/out")
    public String outRoom(){
        String userIdx = "이도겸";
        Optional<String> roomIdx = roomService.checkUserRoom(userIdx);
        roomIdx.ifPresent(s -> roomService.removeUser(s, userIdx));
        return " ";
    }

    @PostMapping("/create") // 방 생성할 때 유저 idx 받아온다.
    public String createRoom(){
        String userIdx = "이도겸";

//        Optional<String> roomIdx = roomService.checkUserRoom(userIdx);
//
//        if(roomIdx.isPresent()){
//            System.out.println("여기는 무시하세요");
//            roomService.removeUser(userIdx, roomIdx.get());
//            ans = roomIdx.get();
//        }

        String newRoomIdx = roomService.createRoomIdx();

        return newRoomIdx;
        }
}
