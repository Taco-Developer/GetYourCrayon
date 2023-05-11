package com.sevenight.coldcrayon.room.controller;
import com.sevenight.coldcrayon.auth.dto.UserDto;
import com.sevenight.coldcrayon.auth.service.AuthService;
import com.sevenight.coldcrayon.room.dto.RoomDto;
import com.sevenight.coldcrayon.room.dto.RoomReqestDto;
import com.sevenight.coldcrayon.room.service.RoomService;
import com.sevenight.coldcrayon.util.HeaderUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequestMapping("/api/room")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;
    private final AuthService authService;

    @PostMapping("/create")
    public ResponseEntity<RoomDto> createRoom(@RequestHeader String Authorization){

//        UserDto user = authService.selectOneMember(HeaderUtil.getAccessTokenString(Authorization));
        UserDto user = UserDto.builder().userIdx(1L).userEmail("1번@naver.com").userPoint(0).userNickname("바보").build();
        RoomDto roomDto = roomService.saveRoom(user);
        System.out.println("완료");

        return ResponseEntity.status(HttpStatus.OK).body(roomDto);
    }

    @PostMapping("/join")
    public ResponseEntity<RoomDto> joinRoom(@RequestHeader String Authorization, @RequestBody String roomIdx){

//        UserDto user = authService.selectOneMember(HeaderUtil.getAccessTokenString(Authorization));

        System.err.println("dmasdfkeaiwofhjiodsa;fjioa;ejfklasd;jfioa;ewjf");
        UserDto user = UserDto.builder().userIdx(2L).userEmail("2번@naver.com").userPoint(0).userNickname("바보2").build();

        RoomDto roomDto = roomService.joinRoom(user, roomIdx);

        return ResponseEntity.status(HttpStatus.OK).body(roomDto);
    }

    @PostMapping("/out")
    public String outRoom(@RequestHeader String Authorization){

//        UserDto user = authService.selectOneMember(HeaderUtil.getAccessTokenString(Authorization));
        UserDto user = UserDto.builder().userIdx(1L).userEmail("1번@naver.com").userPoint(0).userNickname("바보").build();
        return roomService.outRoom(user);
    }

    @PatchMapping("/change-admin")
    public RoomDto changeAdmin(@RequestHeader String Authorization, @RequestBody RoomReqestDto roomReqestDto){
//        UserDto user = authService.selectOneMember(HeaderUtil.getAccessTokenString(Authorization));
//        return roomService.changeAdminUser(user, roomIdx, toUserIdx);
        UserDto user = UserDto.builder().userIdx(1L).userEmail("1번@naver.com").userPoint(0).userNickname("바보").build();

        return roomService.changeAdminUser(user, roomReqestDto.getRoomIdx(), roomReqestDto.getToUserIdx());
    }

    @PatchMapping("/maxuser")
    public RoomDto changeMaxUser(@RequestHeader String Authorization, @RequestBody RoomReqestDto roomReqestDto){

//        UserDto user = authService.selectOneMember(HeaderUtil.getAccessTokenString(Authorization));
        UserDto user = UserDto.builder().userIdx(1L).userEmail("1번@naver.com").userPoint(0).userNickname("바보").build();
        return roomService.changeMaxUser(user, roomReqestDto.getRoomIdx(), roomReqestDto.getRoomMax());

    }


    @GetMapping("/{roomIdx}")
    public ResponseEntity<RoomDto> getRoom(@PathVariable String roomIdx){
        RoomDto roomDto = roomService.getRoom(roomIdx);
        return ResponseEntity.ok().body(roomDto);
    }
}
