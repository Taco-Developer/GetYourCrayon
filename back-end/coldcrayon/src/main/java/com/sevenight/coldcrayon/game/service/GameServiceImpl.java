package com.sevenight.coldcrayon.game.service;

import com.querydsl.jpa.impl.JPAQuery;
import com.sevenight.coldcrayon.auth.dto.UserDto;
import com.sevenight.coldcrayon.game.dto.GameRequestDto;
import com.sevenight.coldcrayon.game.dto.ResponseGameDto;
import com.sevenight.coldcrayon.game.entity.GameCategory;
import com.sevenight.coldcrayon.game.repository.GameRepository;
import com.sevenight.coldcrayon.joinlist.service.JoinListService;
import com.sevenight.coldcrayon.room.entity.RoomHash;
import com.sevenight.coldcrayon.room.entity.RoomStatus;
import com.sevenight.coldcrayon.room.entity.UserHash;
import com.sevenight.coldcrayon.room.repository.RoomRepository;
import com.sevenight.coldcrayon.room.repository.UserHashRepository;
import com.sevenight.coldcrayon.theme.entity.QTheme;
import com.sevenight.coldcrayon.theme.entity.Theme;
import com.sevenight.coldcrayon.theme.entity.ThemeCategory;
import com.sevenight.coldcrayon.theme.repository.ThemeRepository;
import com.sevenight.coldcrayon.theme.service.ThemeService;
import com.sevenight.coldcrayon.theme.service.ThemeServiceImpl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class GameServiceImpl implements GameService{


    private final RoomRepository roomRepository;
    private final JoinListService joinListService;
    private final UserHashRepository userHashRepository;
    private final EntityManager entityManager;
    private final GameRepository gameRepository;
    private final Random random = new Random();
    private final ThemeService themeService;
//    private final JPAQuery<Theme> query;
//    private final QTheme qTheme;
//    private final JPAQuery<Theme> query = new JPAQuery(entityManager);


    public String startGame(UserDto userDto, GameRequestDto gameRequestDto){
        System.err.println(gameRequestDto);
        Optional<RoomHash> optionalRoomHash = roomRepository.findById(gameRequestDto.getRoomIdx());

        if(optionalRoomHash.isEmpty()){
            System.err.println("방이 없어요...............");
            return null;
        }

        RoomHash room = optionalRoomHash.get();

        // 방장인지 확인
        if(!room.getAdminUserIdx().equals(userDto.getUserIdx())){
            System.err.println("방장이 아니에요...............");
            return null;
        }
        // 방의 인원이 3명 이하나, 게임이 시작한 방인지 확인하기
        if (room.getRoomNow() < 2 && !room.getRoomStatus().equals(RoomStatus.Ready)){
            System.err.println("최소 3명의 인원이 필요합니다. 방이 게임중인 상태인가요?");
            return null;
        }

        // 게임 방 설정 변경
        room.setRoomStatus(RoomStatus.Playing);
        room.setGameCnt(room.getGameCnt() + 1);
        room.setGameCategory(gameRequestDto.getGameCategory());
        room.setMaxRound(gameRequestDto.getMaxRound());

        // 방에 참여하고 있는 유저를 불러와서 점수를 0점으로 만든다.
        List<Object> userList = joinListService.getJoinList(room.getRoomIdx());

        for(Object userIdx : userList){
            Optional<UserHash> userHashOptional = userHashRepository.findById(Long.parseLong(userIdx.toString()));
            if(userHashOptional.isEmpty()){
                if(userList.size() == room.getRoomNow()){
                    System.err.println(userIdx + " 삭제 함");
                    room.setRoomNow(room.getRoomNow() - 1);
                    joinListService.removeUser(room.getRoomIdx(), Long.parseLong(userIdx.toString()));
                }
                System.err.println("유저가 없는데요?");
            }

            UserHash userHash = userHashOptional.get();
            userHash.setUserScore(0);
            userHashRepository.save(userHash);
            System.err.println(userHashRepository.findById(Long.parseLong(userIdx.toString())).get());
        }

        roomRepository.save(room);
        // 어딘가에 게임 테마랑 방 정보를 저장해둬야 한다.

        ThemeCategory[] themeCategories = ThemeCategory.values();
        ThemeCategory themeCategory = themeCategories[random.nextInt(themeCategories.length)];
        return themeService.getThemeKeyword(themeCategory);
        // game 모드가 AI라면,,,
        // switch(gameRequestDto.getGameCategory()){
        //     case AI:
        //         break;
        //     case LIAR:
        //         break;
        //     case CATCH:
        //         break;
        //     case RELAY:
        //         break;
        //     case REVERSE:
        //         break;
        //     default:
        //         System.err.println("게임 모드 없어~~~~~~~~~~~~~~~~");
        //         return null;
        }




    public void getAiImg(String themeCategory, String suffix, String roomIdx, int gameCnt, int roundCnt){


    }

    // 방에 있는 유저 중에서 한명 뽑아서 랜덤으로 지정하기
    public Object choiceUser(String roomIdx){
        List<Object> userList = joinListService.getJoinList(roomIdx);
        for (Object user : userList) {
            System.err.println(user.toString());
        }
        Object user = userList.get(random.nextInt(userList.size()));
        return user;
    }


    // 게임 결과 받아서 유저
    public void roundOver(String roomIdx, Long userIdx){
        // 1. 유저를 찾아서 point 넣기

        // 2. 유저 저장

        // 3. 방에 있는 모든 유저 정보 가지고 와서 넘겨주기

    }


}
