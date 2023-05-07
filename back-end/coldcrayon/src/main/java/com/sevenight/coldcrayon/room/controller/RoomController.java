package com.sevenight.coldcrayon.room.controller;


import com.sevenight.coldcrayon.room.dto.RoomDto;
import com.sevenight.coldcrayon.room.service.RoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/game")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @PostMapping("/out")
    public String outRoom(@RequestHeader String userIdx){
        Optional<String> roomIdx = roomService.checkUserRoom(userIdx);
        roomIdx.ifPresent(s -> roomService.removeUser(s, userIdx));
        return " ";
    }

    @PostMapping("/create") // 방 생성할 때 유저 idx 받아온다.
    public ResponseEntity<RoomDto> createRoom(@RequestHeader String userIdx){

        RoomDto roomDto = roomService.saveRoom(userIdx);
        return ResponseEntity.status(HttpStatus.OK).body(roomDto);
        }
}
