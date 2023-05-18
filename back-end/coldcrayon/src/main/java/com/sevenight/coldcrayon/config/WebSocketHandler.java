package com.sevenight.coldcrayon.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sevenight.coldcrayon.auth.dto.UserDto;
import com.sevenight.coldcrayon.auth.service.AuthService;
import com.sevenight.coldcrayon.game.dto.*;
import com.sevenight.coldcrayon.game.entity.GameCategory;
import com.sevenight.coldcrayon.game.service.GameService;
import com.sevenight.coldcrayon.room.dto.RoomResponseDto;
import com.sevenight.coldcrayon.room.dto.UserHashResponseDto;
import com.sevenight.coldcrayon.room.entity.RoomHash;
import com.sevenight.coldcrayon.room.repository.RoomRepository;
import com.sevenight.coldcrayon.room.service.RoomService;
import com.sevenight.coldcrayon.user.service.UserService;
import com.sevenight.coldcrayon.util.HeaderUtil;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.*;

@Slf4j
public class WebSocketHandler extends TextWebSocketHandler {
    // ConcurrentHashMap: 여러 스레드가 동시에 접근해도 안전하게 동작
    private final Map<String, List<WebSocketSession>> sessionsMap = new ConcurrentHashMap<>();

    private final LinkedHashMap<String, UserInfo> userInfoMap = new LinkedHashMap<>();      // session.id, userInfo
    private Map<Long, Integer> userScoreMap = new ConcurrentHashMap<>();



    // 게임 정보를 담을 Map타입으로 하나 만들어서 해당 정보로 공유하자
    private Map<String, String> gameInfoMap = new ConcurrentHashMap<>();

    // 타이머
    private Map<String, ScheduledFuture<?>> timers = new ConcurrentHashMap<>();


    // 외부 서비스 주입
    private final WebSocketCustomService webSocketCustomService;
    private final RoomService roomService;
    private final UserService userService;
    private final GameService gameService;
    private final AuthService authService;
    private final RoomRepository roomRepository;


    public WebSocketHandler(WebSocketCustomService webSocketCustomService, RoomService roomService,
                            UserService userService, GameService gameService, AuthService authService,
                            RoomRepository roomRepository
    ) {
        this.authService = authService;
        this.roomService = roomService;
        this.webSocketCustomService = webSocketCustomService;
        this.userService = userService;
        this.gameService = gameService;
        this.roomRepository = roomRepository;
    }

    // flag 변수

    // roomTitle을 가져와야 할까요??

    public Map<String, Object> initailizeRoomInfo(String roomIdx) {
        Optional<RoomHash> roomHashOptional = roomRepository.findById(roomIdx);
        Map<String, Object> roomInfoMap = new ConcurrentHashMap<>();
        if(roomHashOptional.isPresent()){
            RoomHash roomHash = roomHashOptional.get();
            roomInfoMap.put("roomIdx", roomIdx);
            roomInfoMap.put("roundTime", 20);
            roomInfoMap.put("answer", roomHash.getAnswer());
            roomInfoMap.put("roomNow", roomHash.getRoomNow());
            roomInfoMap.put("roomMax", roomHash.getRoomMax());
            roomInfoMap.put("maxRound", roomHash.getMaxRound());
            roomInfoMap.put("gameCategory", roomHash.getGameCategory());
            roomInfoMap.put("roomStatus", roomHash.getRoomStatus());
            roomInfoMap.put("adminUserIdx", roomHash.getAdminUserIdx());
            roomInfoMap.put("nowRound", roomHash.getNowRound());
            roomInfoMap.put("roomTurn", 0);
        };
        return roomInfoMap;
    }

    public void timer(List<WebSocketSession> sessions, String roomIdx){

        int initialDelay = 1;
        int period = 1;
//        int roundTime = (int) roomInfoMap.get("roundTime");
        int roundTime = 20;


        //예약한 작업을 실행할 주체
        ScheduledExecutorService executorService = Executors.newSingleThreadScheduledExecutor();

        //예약한 작업
        Runnable task = new Runnable() {
            int time = roundTime;
            ObjectMapper objectMapper = new ObjectMapper();
            @Override
            public void run() {
                if (time >= 0) {
                    Map<String, Object> response = new HashMap<>();
                    response.put("type", "timeStart");
                    response.put("message", time);
                    String json;
                    try {
                        json = objectMapper.writeValueAsString(response);
                        for (WebSocketSession s : sessions) {
                            if (s.isOpen()) {
                                s.sendMessage(new TextMessage(json));
                            }
                        }
                    } catch (IOException e) {
                        // 예외 처리
                        System.out.println("e = " + e);
                    }
                    time--;
                } else {
                    executorService.shutdown();
                }
            }
        };

        // 매서드 실행부
        ScheduledFuture<?> scheduledFuture = executorService.scheduleAtFixedRate(task, initialDelay, period, TimeUnit.SECONDS);
        timers.put(roomIdx, scheduledFuture);
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String roomId = extractRoomId(session);
        List<WebSocketSession> sessions = sessionsMap.computeIfAbsent(roomId, key -> new CopyOnWriteArrayList<>());

        sessions.add(session);
    }


    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String roomId = extractRoomId(session);
        List<WebSocketSession> sessions = sessionsMap.getOrDefault(roomId, Collections.emptyList());

        Map<String, Object> roomInfoMap = initailizeRoomInfo(roomId);

        // JSON 파싱을 위한 ObjectMapper 객체 생성
        ObjectMapper objectMapper = new ObjectMapper();
        // 메시지 내용을 JSON으로 파싱하여 Map 형태로 변환
        Map<String, String> jsonMessage = objectMapper.readValue(message.getPayload(), new TypeReference<Map<String, String>>() {
        });
        String type = jsonMessage.get("type");

        Map<String, Object> joinRoomResponse;
        // userIn:유저가 들어올 때 userData: (유저Id, 기본점수)
        if (type.equals("userIn")) {
            String authorization = jsonMessage.get("authorization");
            UserDto userDto = authService.selectOneMember(HeaderUtil.getAccessTokenString(authorization));
            // 닉네임, 소켓 아이디을 터미너스에서 확인할 수 있도록 설정: 5/16 DG

            if(userDto.getUserIdx().equals(roomInfoMap.get("adminUserIdx").toString())){
                joinRoomResponse = roomService.firstRoom(roomId);
            } else {
                joinRoomResponse = roomService.joinRoom(userDto, roomId);
            }
            // 세션에 기록: 입장하려는 유저 인스턴스 생성

            // 방 입장 로직 수행
                // 수민 로직 추가 예정: 타입을 ReponseDto로 정상일 때 ResponseDto 정보, 오류일 때 state를 포함한 정보

            String jsonResponse = objectMapper.writeValueAsString(joinRoomResponse);    // 방에 접속한 유저 목록

            for (WebSocketSession s : sessions) {
                if (s.isOpen()) {
                    s.sendMessage(new TextMessage(jsonResponse));       // room, userList 전달
                }
            }

        } else if (type.equals("chat")) {
            String status = jsonMessage.get("status");
            log.error(jsonMessage.toString());

            if(status.equals("answer")){
                String answer = jsonMessage.get("content");
                Long userIdx = Long.parseLong(jsonMessage.get("userIdx"));
                String roomIdx = (String) roomInfoMap.get("roomIdx");
                roomService.CorrectUser(roomIdx, answer ,userIdx);
            }
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

        else if (type.equals("roomUserCnt")) {
            log.error("roomUserCnt : " + "여기 들어옴");
            // 여기를 로직에 추가한다.
            String roomCnt = jsonMessage.get("roomCnt");
            int num = roomService.changeRoomOption(type, roomCnt, roomId);
            if(num==0){

            } else {
                joinRoomResponse = roomService.firstRoom(roomId);

                String jsonResponse = objectMapper.writeValueAsString(joinRoomResponse);

                for (WebSocketSession s : sessions) {
                    if (s.isOpen()) {
                        s.sendMessage(new TextMessage(jsonResponse));       // room, userList 전달
                    }
                }

            }

        }
        else if (type.equals("gameMode")) {
            log.error("gameMode : " + "여기 들어옴");
            // 여기를 로직에 추가한다.
            String gameMode = jsonMessage.get("gameMode");
            roomService.changeRoomOption(type, gameMode, roomId);

            joinRoomResponse = roomService.firstRoom(roomId);

            String jsonResponse = objectMapper.writeValueAsString(joinRoomResponse);

            for (WebSocketSession s : sessions) {
                if (s.isOpen()) {
                    s.sendMessage(new TextMessage(jsonResponse));       // room, userList 전달
                }
            }
        }
        else if (type.equals("gameTurn")) {
            log.error("roomUserCnt : " + "여기 들어옴");
            // 여기를 로직에 추가한다.
            String gameTurn = jsonMessage.get("gameTurn");
            roomService.changeRoomOption(type, gameTurn, roomId);

            joinRoomResponse = roomService.firstRoom(roomId);

            String jsonResponse = objectMapper.writeValueAsString(joinRoomResponse);

            for (WebSocketSession s : sessions) {
                if (s.isOpen()) {
                    s.sendMessage(new TextMessage(jsonResponse));       // room, userList 전달
                }
            }
        }

        // gameTime
        else if (type.equals("gameTime")) {

            int roundTime = (int) roomInfoMap.get("roundTime");

            Map<String, Object> response = new HashMap<>();
            response.put("type", "gameTime");
            response.put("roundTime", roundTime);

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

        // 게임 알림
        else if (type.equals("gameAlert")) {
            for (WebSocketSession s : sessions) {
                if (s.isOpen()) {
                    s.sendMessage(message);
                }
            }
        }

        // 게임 시작
        else if (type.equals("gameStart")) {
            // 현재 설정된 게임 타입을 받아와서 case 구분
            String authorization = jsonMessage.get("authorization");

            UserDto userDto = authService.selectOneMember(HeaderUtil.getAccessTokenString(authorization));

            GameRequestDto gameRequestDto = GameRequestDto.builder()
                    .gameCategory((GameCategory) roomInfoMap.get("gameCategory"))
                    .maxRound((Integer) roomInfoMap.get("maxRound"))
                    .roomIdx(roomId)
                    .build();
            ResponseGameDto responseGameDto = gameService.startGame(userDto, gameRequestDto);

            if (responseGameDto.getStatus().equals("success")) {
                roomInfoMap.put("roomStatus", "Playing");
            }

            String json = objectMapper.writeValueAsString(responseGameDto);

            this.timer(sessions, roomId);

            // 게임 정보
            for (WebSocketSession s : sessions) {
                if (s.isOpen()) {
                    s.sendMessage(new TextMessage(json));
                }
            }

        }
        // 라운드 시작
        else if (type.equals("nextRound")) {
            RequestRoundDto requestRoundDto = RequestRoundDto.builder()
                    .roomIdx(roomId)
                    .build();

            ResponseGameDto responseGameDto = gameService.nextRound(requestRoundDto);      // type: gameDto로 기본 설정되어 있음
            String json = objectMapper.writeValueAsString(responseGameDto);

            this.timer(sessions, roomId);

            for (WebSocketSession s : sessions) {
                if (s.isOpen()) {
                    s.sendMessage(new TextMessage(json));
                }
            }
        }
        // 라운드 종료  ------- type 지정 필요 -------   // 수민: 임시로 내가 설정해서 사용하도록 함
        else if (type.equals("roundOver")) {

            ScheduledFuture<?> scheduledFuture = timers.get(roomId);
            scheduledFuture.cancel(false);

            RequestRoundDto requestRoundDto = RequestRoundDto.builder()
                    .roomIdx(roomId)
                    .build();

            ResponseRoundDto responseRoundDto = gameService.endRound(requestRoundDto);
            responseRoundDto.setType("roundOver");
            String json = objectMapper.writeValueAsString(responseRoundDto);

            // 세션에 기록
            List<UserHashResponseDto> userList = responseRoundDto.getUserList();
            for (UserHashResponseDto userHashResponseDto : userList) {
                Long userIdx1 = userHashResponseDto.getUserIdx();
                int userScore = userHashResponseDto.getUserScore();

                userScoreMap.put(userIdx1, userScore);
            }

            for (WebSocketSession s : sessions) {
                if (s.isOpen()) {
                    s.sendMessage(new TextMessage(json));
                }
            }

            // 게임 종료
        } else if (type.equals("gameOver")) {
            GameEndDto gameEndDto = gameService.endGame(roomId);

            String jsonResponse = objectMapper.writeValueAsString(gameEndDto);
            for (WebSocketSession s : sessions) {
                if (s.isOpen()) {
                    s.sendMessage(new TextMessage(jsonResponse));
                }
            }
        }

    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String roomId = extractRoomId(session);
        UserInfo userInfo = userInfoMap.get(session.getId());   // 세션의 Id로 유저 정보를 가져옴
        log.info("userInfo: {}", userInfo);

        /// 5/17: DG
        // 나가기 실행 시 (나가기 방식 말고)


        log.info("userInfoMap: {}", userInfoMap);
        log.info("userInfoMap.get(session.getId()): {}", userInfoMap.get(session.getId()));
        Long userIdx = userInfoMap.get(session.getId()).userIdx;
        log.info("userIdx: {}", userIdx);


        UserDto userDtoByUserIdx = webSocketCustomService.getUserDtoByUserIdx(userIdx);
        roomService.outRoom(userDtoByUserIdx);

        String userNickname = userInfo.getNickname();   // userInfo에서 닉네임 가져오기 -> 나간 사람 표시
        log.info("userNickname: {}", userNickname);
        String userToken = userInfo.getToken();     // userInfo에서 토큰 값 가져오기
        log.info("userToken: {}", userToken);
        UserDto user = authService.findUser(userToken);     // 토큰으로 유저 Dto 가져오기
        log.info("user: {}", user);

        RoomResponseDto roomResponseDto = roomService.outRoom(user);// user가 DB에서 제거될 수 있도록 처리
        log.info("roomResponseDto: {}", roomResponseDto);

        // usernicknama을 통해 유저 정보를 조회 -> redis에서 정보 삭제해야 함




        List<WebSocketSession> sessions = sessionsMap.getOrDefault(roomId, Collections.emptyList());

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
                jsonMessage.put("status", "chatting");
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
        private Long userIdx;

        public UserInfo() {};
        public UserInfo(String nickname, int score, String token, Long userIdx) {
            this.nickname = nickname;
            this.score = score;
            this.token = token;
            this.userIdx = userIdx;
        }
    }


}
