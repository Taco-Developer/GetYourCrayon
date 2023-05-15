package com.sevenight.coldcrayon.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sevenight.coldcrayon.auth.dto.UserDto;
import com.sevenight.coldcrayon.auth.service.AuthService;
import com.sevenight.coldcrayon.game.dto.GameRequestDto;
import com.sevenight.coldcrayon.game.entity.Game;
import com.sevenight.coldcrayon.game.service.GameService;
import com.sevenight.coldcrayon.room.dto.RoomDto;
import com.sevenight.coldcrayon.room.dto.RoomResponseDto;
import com.sevenight.coldcrayon.room.service.RoomService;
import com.sevenight.coldcrayon.theme.entity.ThemeCategory;
import com.sevenight.coldcrayon.user.dto.ResponseDto;
import com.sevenight.coldcrayon.user.entity.User;
import com.sevenight.coldcrayon.user.service.UserService;
import com.sevenight.coldcrayon.util.HeaderUtil;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

@Slf4j
public class WebSocketHandler extends TextWebSocketHandler {
    // ConcurrentHashMap: 여러 스레드가 동시에 접근해도 안전하게 동작
    private final Map<String, List<WebSocketSession>> sessionsMap = new ConcurrentHashMap<>();

    // 참여자 정보 리스트
    private final LinkedHashMap<String, UserInfo> userInfoMap = new LinkedHashMap<>();

    // 방정보를 담을 Map타입으로 하나 만들어서 해당 정보로 공유하자
    private Map<String, Object> roomInfoMap = new ConcurrentHashMap<>();


    // 외부 서비스 주입
    public WebSocketCustomService webSocketCustomService;
    public RoomService roomService;
    public UserService userService;
    public GameService gameService;
    private final AuthService authService;

    public WebSocketHandler(WebSocketCustomService webSocketCustomService, RoomService roomService, UserService userService, GameService gameService, AuthService authService) {
        this.authService = authService;
        this.roomService = roomService;
    }

    // flag 변수
    private boolean flag = false;   // 웹 소켓이 생성되기 전: false, 한 번 생성되고 난 후: true

    //=============temp==================//

    //
//            if (status.equals("fail")) {    // 실패했을 때
//                for (WebSocketSession s : sessions) {
//                    if (s.isOpen()) {
//                        s.sendMessage(new TextMessage(roomResponseDto.getMessage()));
//                    }
//                }
//            } else {    // 성공했을 때
//                String roomDtoJson = objectMapper.writeValueAsString(roomResponseDto);
//                for (WebSocketSession s : sessions) {
//                    if (s.isOpen()) {
//                        s.sendMessage(new TextMessage(roomDtoJson));
//                    }
//                }
//            }
    //
    //========================================//


    // roomTitle을 가져와야 할까요??
//    public void initailizeRoomInfo(String roomIdx) {
//        RoomDto room = roomService.getRoom(roomIdx);
//        roomInfoMap.put("roomIdx", roomIdx);
//        roomInfoMap.put("roomNow", room.getRoomNow());
//        roomInfoMap.put("roomMax", room.getRoomMax());
//        roomInfoMap.put("maxRound", room.getMaxRound());
//        roomInfoMap.put("gameCategory", room.getGameCategory());
//        roomInfoMap.put("roomStatus", room.getRoomStatus());
//        roomInfoMap.put("adminUserIdx", room.getAdminUserIdx());
//        roomInfoMap.put("gameCnt", room.getGameCnt());
//        roomInfoMap.put("roomCreateTime", room.getRoomCreateTime());
//        roomInfoMap.put("nowRound", room.getNowRound());
//    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String roomId = extractRoomId(session);
        List<WebSocketSession> sessions = sessionsMap.computeIfAbsent(roomId, key -> new CopyOnWriteArrayList<>());
        sessions.add(session);
        log.info(session.getId());

//        if (flag == false) {        // 아직 웹 소켓 연결이 시도된 적이 없을 때: 첫 번째로 시도할 때
//            log.info("flag가 false여서 실행");
//
//            // 소켓에 정보 저장
//            initailizeRoomInfo(roomId);
//
//            // 1번만 실행될 수 있도록 true(이미 실행됨)으로 변경
//            flag = true;
//        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String roomId = extractRoomId(session);
        List<WebSocketSession> sessions = sessionsMap.getOrDefault(roomId, Collections.emptyList());

        // JSON 파싱을 위한 ObjectMapper 객체 생성
        ObjectMapper objectMapper = new ObjectMapper();
        // 메시지 내용을 JSON으로 파싱하여 Map 형태로 변환
        Map<String, String> jsonMessage = objectMapper.readValue(message.getPayload(), new TypeReference<Map<String, String>>() {
        });
        String type = jsonMessage.get("type");

        /// chat, draw, userId, {userScore} //

        // userIn:유저가 들어올 때 userData: (유저Id, 기본점수)
        if (type.equals("userIn")) {
            String authorization = jsonMessage.get("authorization");
            log.info("제발 나와주세요: {}", authorization);
            log.info("HeaderUtil.getAccessTokenString(authorization): {}", HeaderUtil.getAccessTokenString(authorization));
            log.info("authService.selectOneMember(HeaderUtil.getAccessTokenString(authorization): {}", authService.selectOneMember(HeaderUtil.getAccessTokenString(authorization)));
            UserDto userDto = authService.selectOneMember(HeaderUtil.getAccessTokenString(authorization));  // 변경

            // 세션에 기록: 입장하려는 유저 인스턴스 생성
            UserInfo userInfo = userInfoMap.computeIfAbsent(session.getId(), key -> new UserInfo());
            userInfo.setNickname(userDto.getUserNickname());
            userInfo.setScore(0);
            userInfoMap.put(session.getId(), userInfo);
            
            // 방 입장 로직 수행
            RoomResponseDto roomResponseDto = roomService.joinRoom(userDto, roomId);    // 수민 로직 추가 예정: 타입을 ReponseDto로 정상일 때 ResponseDto 정보, 오류일 때 state를 포함한 정보
            String status = roomResponseDto.getStatus();
            if (status.equals("fail")) {    // 실패했을 때
                for (WebSocketSession s : sessions) {
                    if (s.isOpen()) {
                        s.sendMessage(new TextMessage(roomResponseDto.getMessage()));
                    }
                }
            } else {    // 성공했을 때
                String roomDtoJson = objectMapper.writeValueAsString(roomResponseDto);
                for (WebSocketSession s : sessions) {
                    if (s.isOpen()) {
                        s.sendMessage(new TextMessage(roomDtoJson));
                    }
                }
            }



// 수민이 만든 joinRoom 서비스 이용방식으로 변경하면서 주석처리
//            // 최대인원 확인: 현재인원이 최대인원보다 작을 때 true, 같거나 클 경우 false
//            boolean enable = webSocketCustomService.checkEnableEnter(roomId);

//            if (!enable) {  // 입장불가(최대인원 <= 현재인원): false 전송
//                for (WebSocketSession s : sessions) {
//                    if (s.isOpen()) {
//                        s.sendMessage(new TextMessage("false"));
//                    }
//                }
//            } else {  // 입장가능: true
//                // 프론트 전송 확인 필요
//                String userNickname = jsonMessage.get("userNickname");
//                String userIdx = jsonMessage.get("userIdx");  // userIdx: 유저 번호(Long): userId가 닉네임? 주소? user_idx?
//
//                // 입장하려는 유저를 DB에 저장
//                webSocketCustomService.userRoomIn(roomId, Long.valueOf(userIdx));
//
//                // userId를 통해 UserDTO 정보 가져오기
//                UserDto userDto = webSocketCustomService.getUserDto(Long.valueOf(userIdx));
//
//                // roomService.joinRoom 실행
//                roomService.joinRoom(userDto, roomId);
//
//                // 세션에 기록: 입장하려는 유저 인스턴스 생성
//                UserInfo userInfo = userInfoMap.computeIfAbsent(session.getId(), key -> new UserInfo());
//                userInfo.setNickname(userNickname);
//                userInfo.setScore(0);
//                userInfoMap.put(session.getId(), userInfo);
//
//                //== 방에 있는 정보를 전송 ==//
//                for (WebSocketSession s : sessions) {
//                    if (s.isOpen()) {
//                        // 방에 있는 유저 정보(userInfoMap) 전송: <세션, 유저Info(유저 닉네임, 유저 점수)>
//                        List<UserInfo> allUserInfo = new ArrayList<>(userInfoMap.values());
//                        String userJson = objectMapper.writeValueAsString(allUserInfo);
//
//                        // 현재 방 정보: service 이용 vs 소켓 정보 가져오기
//                        RoomDto roomDto = roomService.getRoom(roomId);  // repository 서비스를 통해서
//
//
//                        // 정보 전송
//                        Map<String, Object> combinedJson = new HashMap<>();
//                        combinedJson.put("room", roomDto);
//                        combinedJson.put("users", userJson);
//                        String json = objectMapper.writeValueAsString(combinedJson);
//
//                        s.sendMessage(new TextMessage(json));
//                    }
//                }
//            }
        } else if (type.equals("chat")) {
            for (WebSocketSession s : sessions) {
                if (s.isOpen()) {
                    s.sendMessage(message);
                }
            }
        } else if (type.equals("draw")) {
            for (WebSocketSession s : sessions) {
                if (s.isOpen()) {
                    s.sendMessage(message);
                }
            }
        }
        // 방 최대 인원 변경
        else if (type.equals("changeMax")) {
            String authorization = jsonMessage.get("authorization");
            int changedMax = Integer.parseInt(jsonMessage.get("changedMax"));

            // 세션 기록 변경(세션정보는 변경되지만 굳이 가져올 필요는 없음)
            roomInfoMap.put("roomMax", changedMax);

            UserDto userDto = authService.selectOneMember(HeaderUtil.getAccessTokenString(authorization));
            RoomResponseDto roomResponseDto = roomService.changeMaxUser(userDto, roomId, changedMax);
            String status = roomResponseDto.getStatus();

            if (status.equals("fail")) {
                for (WebSocketSession s : sessions) {
                    if (s.isOpen()) {
                        s.sendMessage(new TextMessage(objectMapper.writeValueAsString(roomResponseDto.getMessage())));
                    }
                }
            } else {
                String roomDtoJson = objectMapper.writeValueAsString(roomResponseDto);
                for (WebSocketSession s : sessions) {
                    if (s.isOpen()) {
                        s.sendMessage(new TextMessage(objectMapper.writeValueAsString(roomDtoJson)));
                    }
                }
            }

//            // 최대 인원에 따라 강퇴하는 로직
//            if (responseDto != null && responseDto.getStatus.equals("success")) {
//                for (WebSocketSession s : sessions) {
//                    if (s.isOpen()) {
//                        // 변경된 방 정보 전송
//                        s.sendMessage(new TextMessage(objectMapper.writeValueAsString(responseDto)));
//                    }
//                }
//            } else {
//                // 최대 인원 변경 실패
//                for (WebSocketSession s : sessions) {
//                    if (s.isOpen()) {
//                        // 변경된 방 정보 전송
//                        s.sendMessage(new TextMessage(objectMapper.writeValueAsString(responseDto)));
//                    }
//                }
//            }
        }
        // 방장 변경
        else if (type.equals("changeAdmin")) {
            String authorization = jsonMessage.get("authorization");
            String newAdminIdx = jsonMessage.get("newAdminIdx");

            // 세션 기록 변경
            roomInfoMap.put("adminUserIdx", newAdminIdx);
            UserDto userDto = authService.selectOneMember(HeaderUtil.getAccessTokenString(authorization));

            RoomResponseDto roomResponseDto = roomService.changeAdminUser(userDto, roomId, Long.valueOf(newAdminIdx));
            String status = roomResponseDto.getStatus();
            if (status.equals("fail")) {
                for (WebSocketSession s : sessions) {
                    if (s.isOpen()) {
                        s.sendMessage(new TextMessage(userDto.getUserNickname()));  // 닉네임을 가진 유저로 방장 변경
                    }
                }
            } else {
                String roomDtoJson = objectMapper.writeValueAsString(roomResponseDto);
                for (WebSocketSession s : sessions) {
                    if (s.isOpen()) {
                        s.sendMessage(new TextMessage(roomDtoJson));
                    }
                }
            }
        }
        // 게임 타입 변경
        else if (type.equals("gameCategory")) {
            String changedGameType = jsonMessage.get("gameCategory");

            // 세션 데이터 변경
            roomInfoMap.put("gameCategory", changedGameType);

            // DB에 게임 타입 저장해야 함
            webSocketCustomService.changeGameType(changedGameType);

            for (WebSocketSession s : sessions) {
                if (s.isOpen()) {
                    s.sendMessage(new TextMessage(changedGameType));
                }
            }
        }
        // 게임 시작
        else if (type.equals("gameStart")) {
            // 현재 설정된 게임 타입을 받아와서 case 구분
            String gameIdx = jsonMessage.get("gameIdx");    // 프론트에서 받을 수 있나요? 수민&도겸 필요
            String authorization = jsonMessage.get("authorization");

            // 소켓 정보 변경
            roomInfoMap.put("roomStatus", "Playing");

            // userDto, gameRequestDto(roomIdx, gameCategory, maxRound) 필요
            UserDto userDto = authService.selectOneMember(HeaderUtil.getAccessTokenString(authorization));
            GameRequestDto gameRequestDto = webSocketCustomService.getGameRequestDto(roomId, Integer.parseInt(gameIdx));  // game_idx 확인 필요

            // gameService 시작
            ThemeCategory[] themeCategories = gameService.startGame(userDto, gameRequestDto);

            // 전송
            for (WebSocketSession s : sessions) {
                if (s.isOpen()) {
                    String json = objectMapper.writeValueAsString(themeCategories);
                    s.sendMessage(new TextMessage(json));
                }
            }
        }

        // 라운드 종료
        else if (type.equals("roundOver")) {
            String gameRoundInfo = jsonMessage.get("gameRoundInfo");

//            // 현재 세션의 유저 닉네임 조회?
//
//            // 참여 유저 수만큼 소켓 데이터에 저장
//            for (UserInfo userinfo : userInfoMap.values()) {
//                if (userinfo.nickname.equals())
//                userinfo.setScore(userinfo.score + {pointsFromRedis?});     // 수민이와 상의: 어떤 써비스로 넘겨받은걸로 아예 갱신
            }

        // 게임 종료
//        } else if (type.equals("gameOver")) {
//
//            // 세션 정보 변경
//            roomInfoMap.put("roomStatus", "Ready");
//
//        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String roomId = extractRoomId(session);
        List<WebSocketSession> sessions = sessionsMap.getOrDefault(roomId, Collections.emptyList());

//        String i = userInfoMap.get(session.getId()).getNickname();
//        sessions.remove(session);
//        userInfoMap.remove(session.getId());
//
//        if (sessions.isEmpty()) {
//            sessionsMap.remove(roomId);
//        }
//
//        for (WebSocketSession s : sessions) {
//            if (s.isOpen()) {
//                // ObjectMapper 객체 생성
//                ObjectMapper objectMapper = new ObjectMapper();
//
//                // 원하는 데이터를 JSON 형식으로 변환
//                Map<String, String> jsonMessage = new HashMap<>();
//                jsonMessage.put("type", "chat");
//                jsonMessage.put("author", "admin");
//                jsonMessage.put("message", i+ "님이 나갔습니다");
//                String json = objectMapper.writeValueAsString(jsonMessage);
//
//                // WebSocket 메시지로 전송
//                s.sendMessage(new TextMessage(json));
//            }
//        }

    }

    private String extractRoomId(WebSocketSession session) {
        String path = session.getUri().getPath();
        return path.substring(path.lastIndexOf('/') + 1);
    }

    @Getter
    @Setter
    private class UserInfo {
        private String nickname;
        private int score;
        public UserInfo() {};
        public UserInfo(String nickname, int score) {
            this.nickname = nickname;
            this.score = score;
        }
    }
}
