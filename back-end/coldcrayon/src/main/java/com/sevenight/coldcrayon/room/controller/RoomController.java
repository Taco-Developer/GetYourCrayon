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
@RequestMapping("/api/room")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @PostMapping("/create")
    public ResponseEntity<RoomDto> createRoom(@RequestHeader String userIdx){

        RoomDto roomDto = roomService.saveRoom(userIdx);

        return ResponseEntity.status(HttpStatus.OK).body(roomDto);
    }

    @PatchMapping("/maxuser")
    public RoomDto changeMaxUser(@RequestHeader String userIdx, @RequestBody String roomIdx, @RequestBody int roomMax){

        return roomService.changeMaxUser(roomIdx, userIdx, roomMax);

    }

    @PatchMapping("/change-admin")
    public RoomDto changeAdmin(@RequestHeader String fromUserIdx, @RequestBody String roomIdx, @RequestBody String toUserIdx){
        return roomService.changeAdminUser(roomIdx, fromUserIdx, toUserIdx);
    }


    @PostMapping("/out")
    public String outRoom(@RequestHeader String userIdx, @RequestBody String roomIdx){
        roomService.removeUser(roomIdx, userIdx);
        return userIdx;
    }

    @GetMapping("/{roomIdx}")
    public ResponseEntity<RoomDto> getRoom(@PathVariable String roomIdx){
        RoomDto roomDto = roomService.getRoom(roomIdx);
        return ResponseEntity.ok().body(roomDto);
    }
}
