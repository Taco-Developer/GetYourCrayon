package com.sevenight.coldcrayon.config;

import com.amazonaws.Request;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sevenight.coldcrayon.auth.dto.UserDto;
import com.sevenight.coldcrayon.auth.service.AuthService;
import com.sevenight.coldcrayon.game.dto.GameRequestDto;
import com.sevenight.coldcrayon.game.dto.RequestRoundDto;
import com.sevenight.coldcrayon.game.dto.ResponseGameDto;
import com.sevenight.coldcrayon.game.dto.ResponseRoundDto;
import com.sevenight.coldcrayon.game.entity.GameCategory;
import com.sevenight.coldcrayon.game.service.GameService;
import com.sevenight.coldcrayon.room.dto.RoomDto;
import com.sevenight.coldcrayon.room.dto.RoomResponseDto;
import com.sevenight.coldcrayon.room.entity.UserHash;
import com.sevenight.coldcrayon.room.service.RoomService;
import com.sevenight.coldcrayon.theme.entity.ThemeCategory;
import com.sevenight.coldcrayon.user.dto.ResponseDto;
import com.sevenight.coldcrayon.user.entity.User;
import com.sevenight.coldcrayon.user.service.UserService;
import com.sevenight.coldcrayon.util.HeaderUtil;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

@Slf4j
public class WebSocketHandler extends TextWebSocketHandler {
    // ConcurrentHashMap: 여러 스레드가 동시에 접근해도 안전하게 동작
    private final Map<String, List<WebSocketSession>> sessionsMap = new ConcurrentHashMap<>();

    // 참여자 정보 리스트
    private final LinkedHashMap<String, UserInfo> userInfoMap = new LinkedHashMap<>();

    // 방정보를 담을 Map타입으로 하나 만들어서 해당 정보로 공유하자
    private Map<String, Object> roomInfoMap = new ConcurrentHashMap<>();


    // 외부 서비스 주입
    private final WebSocketCustomService webSocketCustomService;
    private final RoomService roomService;
    private final UserService userService;
    private final GameService gameService;
    private final AuthService authService;


    public WebSocketHandler(WebSocketCustomService webSocketCustomService, RoomService roomService, UserService userService, GameService gameService, AuthService authService) {
        this.authService = authService;
        this.roomService = roomService;
        this.webSocketCustomService = webSocketCustomService;
        this.userService = userService;
        this.gameService = gameService;
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
    public void initailizeRoomInfo(String roomIdx) {
        RoomResponseDto room = roomService.getRoom(roomIdx);
        roomInfoMap.put("roomIdx", roomIdx);
        roomInfoMap.put("roundTime", 100);
        roomInfoMap.put("roomNow", room.getRoomNow());
        roomInfoMap.put("roomMax", room.getRoomMax());
        roomInfoMap.put("maxRound", room.getMaxRound());
        roomInfoMap.put("gameCategory", room.getGameCategory());
        roomInfoMap.put("roomStatus", room.getRoomStatus());
        roomInfoMap.put("adminUserIdx", room.getAdminUserIdx());
        roomInfoMap.put("nowRound", room.getNowRound());
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String roomId = extractRoomId(session);
        List<WebSocketSession> sessions = sessionsMap.computeIfAbsent(roomId, key -> new CopyOnWriteArrayList<>());
        sessions.add(session);
        log.info(session.getId());

        if (flag == false) {        // 아직 웹 소켓 연결이 시도된 적이 없을 때: 첫 번째로 시도할 때
            log.info("flag가 false여서 실행");

            // 소켓에 정보 저장
            initailizeRoomInfo(roomId);

            // 1번만 실행될 수 있도록 true(이미 실행됨)으로 변경
            flag = true;
        }
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
            UserDto userDto = authService.selectOneMember(HeaderUtil.getAccessTokenString(authorization));
            // 닉네임, 소켓 아이디을 터미너스에서 확인할 수 있도록 설정: 5/16 DG
            log.info("접속하는 유저의 닉네임: {}, 소켓 아이디(roomId): {}", userDto.getUserNickname(), roomId);

            // 세션에 기록: 입장하려는 유저 인스턴스 생성
            UserInfo userInfo = userInfoMap.computeIfAbsent(session.getId(), key -> new UserInfo());
            userInfo.setNickname(userDto.getUserNickname());
            userInfo.setScore(0);
            userInfo.setToken(authorization);
            userInfoMap.put(session.getId(), userInfo);
            
            // 방 입장 로직 수행
            RoomResponseDto roomResponseDto = roomService.joinRoom(userDto, roomId);    // 수민 로직 추가 예정: 타입을 ReponseDto로 정상일 때 ResponseDto 정보, 오류일 때 state를 포함한 정보
            roomResponseDto.setType("userIn");
            String status = roomResponseDto.getStatus();
            String message1 = roomResponseDto.getMessage();
            
            if (status.equals("fail")) {    // 실패했을 때
                Map<String, String> response = new HashMap<>();
                response.put("status", status);
                response.put("message", message1);
            
                String jsonResponse = objectMapper.writeValueAsString(response);
                for (WebSocketSession s : sessions) {
                    if (s.isOpen()) {
                        s.sendMessage(new TextMessage(jsonResponse));       // json(status, message) 전달
                    }
                }
            } else {    // 성공했을 때
                String jsonResponse = objectMapper.writeValueAsString(roomResponseDto);    // 방에 접속한 유저 목록

                for (WebSocketSession s : sessions) {
                    if (s.isOpen()) {
                        s.sendMessage(new TextMessage(jsonResponse));       // room, userList 전달
                    }
                }
            }

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

//             세션 기록 변경(세션정보는 변경되지만 굳이 가져올 필요는 없음)
//            roomInfoMap.put("roomMax", changedMax);

            UserDto userDto = authService.selectOneMember(HeaderUtil.getAccessTokenString(authorization));
            RoomResponseDto roomResponseDto = roomService.changeMaxUser(userDto, roomId, changedMax);
            roomResponseDto.setType("changeMax");

            Map<String, String> response = new HashMap<>();
            String status = roomResponseDto.getStatus();
            String message1 = roomResponseDto.getMessage();

            if (status.equals("fail")) {
                response.put("status", status);
                response.put("message", message1);
                String jsonResponse = objectMapper.writeValueAsString(response);
                for (WebSocketSession s : sessions) {
                    if (s.isOpen()) {
                        s.sendMessage(new TextMessage(jsonResponse));
                    }
                }
            } else {
                String jsonResponse = objectMapper.writeValueAsString(roomResponseDto);
                for (WebSocketSession s : sessions) {
                    if (s.isOpen()) {
                        s.sendMessage(new TextMessage(jsonResponse));
                    }
                }
            }
        }
        // 방장 변경
        else if (type.equals("changeAdmin")) {
            String authorization = jsonMessage.get("authorization");
            String newAdminIdx = jsonMessage.get("newAdminIdx");

            // 세션 기록 변경
            roomInfoMap.put("adminUserIdx", newAdminIdx);
            UserDto userDto = authService.selectOneMember(HeaderUtil.getAccessTokenString(authorization));

            RoomResponseDto roomResponseDto = roomService.changeAdminUser(userDto, roomId, Long.valueOf(newAdminIdx));
            roomResponseDto.setType("changeAdmin");
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
            String gameCategory = jsonMessage.get("gameCategory");

            // 세션 데이터 변경
            roomInfoMap.put("gameCategory", gameCategory);

            // DB에 게임 타입 저장해야 함
            webSocketCustomService.changeGameType(gameCategory);

            // 타입 설정 등
            Map<String, String> response = new HashMap<>();
            response.put("type", "gameCategory");
            response.put("gameCategory", gameCategory);
            String jsonResponse = objectMapper.writeValueAsString(response);

            for (WebSocketSession s : sessions) {
                if (s.isOpen()) {
                    s.sendMessage(new TextMessage(jsonResponse));
                }
            }
        }
        // 게임 시간 설정
        else if (type.equals("roundTime")) {
            String changedRoundTime = jsonMessage.get("changedRoundTime");

            roomInfoMap.put("roundTime", Integer.parseInt(changedRoundTime));
        }

        // 게임 시작
        else if (type.equals("gameStart")) {
            // 현재 설정된 게임 타입을 받아와서 case 구분
            log.info("여기좀 확인해봐 제발");
            String authorization = jsonMessage.get("authorization");
            log.info("로그로그 authorization: {}", authorization);

            // 소켓 정보 변경
            roomInfoMap.put("roomStatus", "Playing");

            // userDto, gameRequestDto(roomIdx, gameCategory, maxRound) 필요
            UserDto userDto = authService.selectOneMember(HeaderUtil.getAccessTokenString(authorization));
            GameRequestDto gameRequestDto = GameRequestDto.builder()
                    .gameCategory((GameCategory) roomInfoMap.get("gameCategory"))
                    .maxRound((Integer) roomInfoMap.get("maxRound"))
                    .roomIdx(roomId)
                    .build();
            ResponseGameDto responseGameDto = gameService.startGame(userDto, gameRequestDto);
            String json = objectMapper.writeValueAsString(responseGameDto);

            // 게임 정보
            for (WebSocketSession s : sessions) {
                if (s.isOpen()) {
                    s.sendMessage(new TextMessage(json));
                }
            }

            int roundTime = (int) roomInfoMap.get("roundTime");

//            // 설정된 시간 감소: 테스팅 필요
//            while (roundTime > 0) {
//                Map<String, Object> response = new HashMap<String, Object>();
//                response.put("type", "gameTime");
//                response.put("roundTime", roundTime);
//                String jsonResponse = objectMapper.writeValueAsString(response);
//
//                for (WebSocketSession s : sessions) {
//                    if (s.isOpen()) {
//                        s.sendMessage(new TextMessage(jsonResponse));
//                    }
//                    roundTime--;
//                    Thread.sleep(1000);
//                }
//            }
        }
        // 라운드 시작
        else if(type.equals("roundStart")) {
            RequestRoundDto requestRoundDto = RequestRoundDto.builder()
                    .roomIdx(roomId)
                    .build();

            ResponseGameDto responseGameDto = gameService.nextRound(requestRoundDto);      // type: gameDto로 기본 설정되어 있음
            String json = objectMapper.writeValueAsString(responseGameDto);

            for (WebSocketSession s : sessions) {
                if (s.isOpen()) {
                    s.sendMessage(new TextMessage(json));
                }
            }


        }

        // 라운드 종료  ------- type 지정 필요 -------   // 수민: gameDto에 responseRoundDto type 속성 설정 필요
        else if (type.equals("roundOver")) {
            Long winnerIdx = Long.valueOf(jsonMessage.get("winnerIdx"));

            RequestRoundDto requestRoundDto = RequestRoundDto.builder()
                    .roomIdx(roomId)
                    .winner(winnerIdx)
                    .build();

            ResponseRoundDto responseRoundDto = gameService.endRound(requestRoundDto);
            String json = objectMapper.writeValueAsString(responseRoundDto);

            for (WebSocketSession s : sessions) {
                if (s.isOpen()) {
                    s.sendMessage(new TextMessage(json));
                }
            }



            // 경민 임의 작업 -> 수민이가 작업한걸로 변경시켜야 함
            List<UserHash> userList = roomService.getUserList(roomId);
            Map<String, Object> response = new HashMap<>();
            response.put("type", "roundOver");
            response.put("userList", userList);

            String jsonResponse = objectMapper.writeValueAsString(response);

            for (WebSocketSession s : sessions) {
                if (s.isOpen()) {
                    s.sendMessage(new TextMessage(jsonResponse));
                }
            }
            //-=========-//

        // 게임 종료
        } else if (type.equals("gameOver")) {
            List<UserHash> userList = roomService.getUserList(roomId);
            Map<String, Object> response = new HashMap<>();
            response.put("type", "gameOver");
            response.put("userList", userList);

            String json = objectMapper.writeValueAsString(userList);

            // 소켓 정보 변경
            roomInfoMap.put("roomStatus", "Ready");

            for (WebSocketSession s : sessions) {
                if (s.isOpen()) {
                    s.sendMessage(new TextMessage(json));
                }
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String roomId = extractRoomId(session);

        List<WebSocketSession> sessions = sessionsMap.getOrDefault(roomId, Collections.emptyList());

        UserInfo userInfo = userInfoMap.get(session.getId());   // 세션의 Id로 유저 정보를 가져옴

        String userNickname = userInfo.getNickname();   // userInfo에서 닉네임 가져오기 -> 나간 사람 표시
        String userToken = userInfo.getToken();     // userInfo에서 토큰 값 가져오기
        UserDto user = authService.findUser(userToken);     // 토큰으로 유저 Dto 가져오기

        roomService.outRoom(user);      // user가 DB에서 제거될 수 있도록 처리

        sessions.remove(session);       // 세션 제거

        if (sessions.isEmpty()) {
            sessionsMap.remove(roomId);
        }

        for (WebSocketSession s : sessions) {
            if (s.isOpen()) {
                // ObjectMapper 객체 생성
                ObjectMapper objectMapper = new ObjectMapper();

                // 원하는 데이터를 JSON 형식으로 변환
                Map<String, String> jsonMessage = new HashMap<>();
                jsonMessage.put("type", "chat");
                jsonMessage.put("author", "admin");
                jsonMessage.put("message", userNickname+ "님이 나갔습니다");
                String json = objectMapper.writeValueAsString(jsonMessage);

                // WebSocket 메시지로 전송
                s.sendMessage(new TextMessage(json));
            }
        }

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
        private String token;

        public UserInfo() {};
        public UserInfo(String nickname, int score, String token) {
            this.nickname = nickname;
            this.score = score;
            this.token = token;
        }
    }
}
