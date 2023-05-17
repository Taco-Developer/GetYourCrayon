package com.sevenight.coldcrayon.game.service;

import com.sevenight.coldcrayon.auth.dto.UserDto;
import com.sevenight.coldcrayon.game.dto.*;
import com.sevenight.coldcrayon.game.repository.GameRepository;
import com.sevenight.coldcrayon.joinlist.service.JoinListService;
import com.sevenight.coldcrayon.room.dto.UserHashResponseDto;
import com.sevenight.coldcrayon.room.entity.RoomHash;
import com.sevenight.coldcrayon.room.entity.RoomStatus;
import com.sevenight.coldcrayon.room.entity.UserHash;
import com.sevenight.coldcrayon.room.repository.RoomRepository;
import com.sevenight.coldcrayon.room.repository.UserHashRepository;
import com.sevenight.coldcrayon.theme.entity.ThemeCategory;
import com.sevenight.coldcrayon.theme.service.ThemeService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.File;
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
            } else if(room.getRoomStatus().equals(RoomStatus.Playing)){
                message = "게임중인 방입니다.";
            } else {
                // 게임 방 설정 변경
                status = "success";

                room.setRoomStatus(RoomStatus.Playing);
                room.setGameCnt(room.getGameCnt() + 1);
                room.setGameCategory(gameRequestDto.getGameCategory());
                room.setNowRound(1);

                roomRepository.save(room);


                // 방에 참여하고 있는 유저를 불러와서 점수를 0점으로 만든다.
                List<UserHashResponseDto> userHashResponseDtoList = new ArrayList<>();

                List<Object> userList = joinListService.getJoinList(room.getRoomIdx());
                for(Object userIdx : userList){
                    Optional<UserHash> userHashOptional = userHashRepository.findById(Long.parseLong(userIdx.toString()));
                    if(userHashOptional.isPresent()){
                        UserHash userHash = userHashOptional.get();
                        System.err.println(userHash);
                        userHash.setUserScore(0);
                        userHashRepository.save(userHash);
                        userHashResponseDtoList.add(UserHashResponseDto.of(userHash));
                    }

                }


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
                responseGameDto.setUserList(userHashResponseDtoList);
            }
        }

        responseGameDto.setStatus(status);
        responseGameDto.setMessage(message);
        return responseGameDto;

    }

    public ResponseRoundDto endRound(RequestRoundDto requestRoundDto){
        String status = "fail";
        String message;
        ResponseRoundDto responseRoundDto = new ResponseRoundDto();
        Optional<RoomHash> optionalRoomHash = roomRepository.findById(requestRoundDto.getRoomIdx());
        System.err.println("서비스 진입");
        if(optionalRoomHash.isPresent()){
            RoomHash roomHash = optionalRoomHash.get();
            status = "success";
            message = "유저 포인트 변경 내역입니다.";
            List<Object> userList = joinListService.getJoinList(roomHash.getRoomIdx());
            System.err.println("if문 진입");
            List<UserHashResponseDto> userHashResponseDtoList = new ArrayList<>();

            for(Object user: userList){
                Optional<UserHash> optionalUserHash = userHashRepository.findById(Long.parseLong(user.toString()));
                if(optionalUserHash.isPresent()){
                    UserHash userHash = optionalUserHash.get();
                    System.err.println(userHash);
                    if(!requestRoundDto.getWinner().equals(0L)){
                        userHash.setUserScore(userHash.getUserScore() + 3);
                        if(userHash.getUserIdx().equals(requestRoundDto.getWinner())){
                            userHash.setUserScore(userHash.getUserScore() + 3);
                            responseRoundDto.setWinnerUserIdx(userHash.getUserIdx());
                        }
                    }
                    userHashRepository.save(userHash);
                    userHashResponseDtoList.add(UserHashResponseDto.of(userHash));
                }
            }
            System.err.println("여기까지 통과1");
            responseRoundDto.setUserList(userHashResponseDtoList);
            responseRoundDto.setDefualtScore(3);
            responseRoundDto.setWinnerScore(3);
            System.err.println("여기까지 통과2");
        } else{
            message = "조회한 방이 없습니다.";
        }
        System.err.println("여기까지 통과3");
        responseRoundDto.setMessage(message);
        System.err.println("여기까지 통과4");
        responseRoundDto.setStatus(status);
        System.err.println("여기까지 통과5");
        return responseRoundDto;
    }

    public ResponseGameDto nextRound(RequestRoundDto requestRoundDto) throws IOException {

        ResponseGameDto responseGameDto = new ResponseGameDto();
        String status = "fail";
        String message;

        List<Object> userList = joinListService.getJoinList(requestRoundDto.getRoomIdx());
        Optional<RoomHash> optionalRoomHash = roomRepository.findById(requestRoundDto.getRoomIdx());

        if(optionalRoomHash.isPresent()) {
            RoomHash roomHash = optionalRoomHash.get();

            roomHash.setNowRound(roomHash.getNowRound() + 1);
            if (roomHash.getNowRound() > roomHash.getMaxRound()) {
                message = "최대 라운드 초과";
            } else {
                message = "다음 라운드 정보";
                status = "success";

                roomRepository.save(roomHash);

                ThemeCategory[] themeCategories = ThemeCategory.values();
                ThemeCategory themeCategory = themeCategories[random.nextInt(themeCategories.length)];
                List<String> keywords = themeService.getThemeKeyword(themeCategory);
                message = keywords.get(1) + keywords.get(0);
                String translateScript = webClientService.papagoPost(message);
                //             game 모드가 AI라면,,,

                responseGameDto.setTheme(themeCategory);
                responseGameDto.setCorrect(keywords.get(1));


                switch (roomHash.getGameCategory()) {
                    case AI:
                        List<Object> dalEResponse = webClientService.AiPost(translateScript);

                        Long i = 0L;
                        List<String> dests = new ArrayList<>();
                        for (Object element : dalEResponse) {
                            Map<String, String> urlMap = (Map) element;
                            String url = urlMap.get("url");

                            String destination = roomHash.getRoomIdx() + "/" + roomHash.getGameCnt() + "/" + roomHash.getNowRound();
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

                List<UserHashResponseDto> userHashResponseDtoList = new ArrayList<>();

                for(Object userIdx : userList){
                    Optional<UserHash> userHashOptional = userHashRepository.findById(Long.parseLong(userIdx.toString()));
                    if(userHashOptional.isPresent()){
                        UserHash userHash = userHashOptional.get();
                        userHashRepository.save(userHash);
                        userHashResponseDtoList.add(UserHashResponseDto.of(userHash));
                    }

                }
                // 그림 그리는 유저 1명 지정하기
                Object user = userList.get(random.nextInt(userList.size()));

                responseGameDto.setSelectedUserIdx(Long.parseLong(user.toString()));
                responseGameDto.setUserList(userHashResponseDtoList);
            }
        } else {
            message = "방이 없어요.";
        }

        responseGameDto.setStatus(status);
        responseGameDto.setMessage(message);

        return responseGameDto;
    }

    public GameEndDto endGame(String roomIdx) {

        GameEndDto gameEndDto = new GameEndDto();

        List<Object> userList = joinListService.getJoinList(roomIdx);
        System.err.println("userList" +"\n" + userList);
        Optional<RoomHash> optionalRoomHash = roomRepository.findById(roomIdx);
        if (optionalRoomHash.isPresent()) {
            List<UserHashResponseDto> userHashResponseDtoList = new ArrayList<>();

            RoomHash roomHash = optionalRoomHash.get();
            System.err.println("roomHash" +"\n" + roomHash);

            gameEndDto.setMessage("게임 끝");
            gameEndDto.setStatus("success");
            roomHash.setRoomStatus(RoomStatus.Ready);
            roomRepository.save(roomHash);

            for (Object user : userList) {
                Optional<UserHash> optionalUserHash = userHashRepository.findById(Long.parseLong(user.toString()));
                if (optionalUserHash.isPresent()) {
                    UserHash userHash = optionalUserHash.get();
                    userHash.setUserPoint(userHash.getUserScore() + userHash.getUserPoint());
                    userHashResponseDtoList.add(UserHashResponseDto.of(userHash));

                    userHash.setUserScore(0);
                    userHashRepository.save(userHash);
                }
            }

            Map<Integer, List<String>> urlMap = new LinkedHashMap<>();
            String topDir = "/getchacrayon/image/history/" + roomHash.getRoomIdx() + "/" + roomHash.getGameCnt();

            File dir = new File(topDir);
            File subDirs[] = dir.listFiles();
            String[] dirNames = dir.list();

            System.err.println("topDir" + topDir);
            System.err.println("Arrays.toString(subDirs) : " + Arrays.toString(subDirs));
            System.err.println("Arrays.toString(dirNames) : " + Arrays.toString(dirNames));

            for (int i = 0; i < subDirs.length; i++) {
                File files[] = subDirs[i].listFiles();
                System.err.println("Arrays.toString(files) : " + Arrays.toString(files));
                List<String> urlList = new ArrayList<>();
                for (File file : files) {
                    urlList.add(file.getPath());
                }
                urlMap.put(Integer.parseInt(dirNames[i]), urlList);
                System.err.println(urlMap.toString());
            }
            gameEndDto.setUrlList(urlMap);
            gameEndDto.setUserHashResponseDtoList(userHashResponseDtoList);

        } else {
            gameEndDto.setMessage("방이 없어요.");
        }

        return gameEndDto;
    }
}



