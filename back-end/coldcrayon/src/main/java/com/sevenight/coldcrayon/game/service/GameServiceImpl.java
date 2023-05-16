package com.sevenight.coldcrayon.game.service;

import com.sevenight.coldcrayon.auth.dto.UserDto;
import com.sevenight.coldcrayon.game.dto.GameRequestDto;
import com.sevenight.coldcrayon.game.dto.ResponseGameDto;
import com.sevenight.coldcrayon.game.repository.GameRepository;
import com.sevenight.coldcrayon.joinlist.service.JoinListService;
import com.sevenight.coldcrayon.room.entity.RoomHash;
import com.sevenight.coldcrayon.room.entity.RoomStatus;
import com.sevenight.coldcrayon.room.entity.UserHash;
import com.sevenight.coldcrayon.room.repository.RoomRepository;
import com.sevenight.coldcrayon.room.repository.UserHashRepository;
import com.sevenight.coldcrayon.theme.entity.ThemeCategory;
import com.sevenight.coldcrayon.theme.service.ThemeService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class GameServiceImpl implements GameService{


    private final RoomRepository roomRepository;
    private final JoinListService joinListService;
    private final UserHashRepository userHashRepository;
    private final Random random = new Random();
    private final ThemeService themeService;
    private final WebClientServiceImpl webClientService;
    private final SaveImageServiceImpl saveImageService;


    public ResponseGameDto startGame(UserDto userDto, GameRequestDto gameRequestDto) throws IOException {
        ResponseGameDto responseGameDto = new ResponseGameDto();
        System.err.println(gameRequestDto);
        String message;
        String status = "fail";
        Optional<RoomHash> optionalRoomHash = roomRepository.findById(gameRequestDto.getRoomIdx());

        if(optionalRoomHash.isEmpty()){
            message = "방이 없어요.";
        } else {
            RoomHash room = optionalRoomHash.get();
            // 방장인지 확인
            if(!room.getAdminUserIdx().equals(userDto.getUserIdx())){
                message = "방장이 아니에요.";
            } else if (room.getRoomNow() < 1) {
                message = "최소 3명의 인원이 필요합니다.";
            } 
            // else if(room.getRoomStatus().equals(RoomStatus.Playing)){
                // message = "방이 게임중인 상태인가요?";
            // } 
            else {
                // 게임 방 설정 변경
                System.err.println("방을 만듭니다.");
                status = "success";

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
                            room.setRoomNow(room.getRoomNow() + 1);
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
                List<String> keywords = themeService.getThemeKeyword(themeCategory);
                message = keywords.get(1) + keywords.get(0);
                String translateScript = webClientService.papagoPost(message);
                //             game 모드가 AI라면,,,

                responseGameDto.setTheme(themeCategory);
                responseGameDto.setCorrect(keywords.get(1));


                switch(gameRequestDto.getGameCategory()) {
                    case AI:
                        List<Object> dalEResponse = webClientService.AiPost(translateScript);

                        Long i = 0L;
                        List<String> dests = new ArrayList<>();
                        for (Object element : dalEResponse) {
                            Map<String, String> urlMap = (Map) element;
                            String url = urlMap.get("url");

                            String destination = room.getRoomIdx() + "/" + room.getGameCnt() + "/" + room.getNowRound();
                            System.err.println(url);
                            System.err.println(destination);
                            String dest = saveImageService.downloadImage(url, destination, ++i);
                            dests.add(dest);
                        }

                        responseGameDto.setUrlList(dests);
                        break;
                    case LIAR:
                        break;
                    case CATCH:
                        break;
                    case RELAY:
                        break;
                    case REVERSE:
                        break;
                    default:
                        System.err.println("게임 모드 없어~~~~~~~~~~~~~~~~");
                        return null;
                }

                // 그림 그리는 유저 1명 지정하기
                Object user = userList.get(random.nextInt(userList.size()));

                responseGameDto.setSelectedUserIdx(Long.parseLong(user.toString()));
                responseGameDto.setUserList(userList);
            }
        }

        responseGameDto.setStatus(status);
        responseGameDto.setMessage(message);
        return responseGameDto;

    }
}



