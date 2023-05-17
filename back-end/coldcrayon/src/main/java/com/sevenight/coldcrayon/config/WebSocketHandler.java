package com.sevenight.coldcrayon.config;

import com.amazonaws.Request;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nimbusds.openid.connect.sdk.claims.UserInfo;
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
import com.sevenight.coldcrayon.room.dto.UserHashResponseDto;
import com.sevenight.coldcrayon.room.entity.UserHash;
import com.sevenight.coldcrayon.room.service.RoomService;
import com.sevenight.coldcrayon.theme.entity.ThemeCategory;
import com.sevenight.coldcrayon.user.dto.ResponseDto;
import com.sevenight.coldcrayon.user.entity.User;
import com.sevenight.coldcrayon.user.repository.UserRepository;
import com.sevenight.coldcrayon.user.service.UserService;
import com.sevenight.coldcrayon.util.HeaderUtil;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.validation.ObjectError;
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

    private final LinkedHashMap<String, UserInfo> userInfoMap = new LinkedHashMap<>();      // session.id, userInfo
    private Map<Long, Integer> userScoreMap = new ConcurrentHashMap<>();


    // 방정보를 담을 Map타입으로 하나 만들어서 해당 정보로 공유하자
    private Map<String, Object> roomInfoMap = new ConcurrentHashMap<>();

    // 게임 정보를 담을 Map타입으로 하나 만들어서 해당 정보로 공유하자
    private Map<String, String> gameInfoMap = new ConcurrentHashMap<>();


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

    // roomTitle을 가져와야 할까요??
    public void initailizeRoomInfo(String roomIdx) {
        RoomResponseDto room = roomService.getRoom(roomIdx);
        roomInfoMap.put("roomIdx", roomIdx);
        roomInfoMap.put("roundTime", 20);
        roomInfoMap.put("roomNow", room.getRoomNow());
        roomInfoMap.put("roomMax", room.getRoomMax());
        roomInfoMap.put("maxRound", room.getMaxRound());
        roomInfoMap.put("gameCategory", room.getGameCategory());
        roomInfoMap.put("roomStatus", room.getRoomStatus());
        roomInfoMap.put("adminUserIdx", room.getAdminUserIdx());
        roomInfoMap.put("nowRound", room.getNowRound());
        roomInfoMap.put("roomTurn", 0);
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String roomId = extractRoomId(session);
        List<WebSocketSession> sessions = sessionsMap.computeIfAbsent(roomId, key -> new CopyOnWriteArrayList<>());
        sessions.add(session);
        log.info(session.getId());

        // 소켓에 정보 저장
        initailizeRoomInfo(roomId);
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

        //==========================================//
        //시간관련 설정들
//        int initialDelay = 0;
//        int period = 1;
//        int roundTime = 60;

//        //예약한 작업을 실행할 주체
//        ScheduledExecutorService executorService = Executors.newSingleThreadScheduledExecutor();
//
//        //예약한 작업
//        Runnable task = new Runnable() {
//            int time = roundTime;
//
//            @Override
//            public void run() {
//                if (time > 0) {
//                    Map<String, String> jsonMessage2 = new HashMap<>();
//                    jsonMessage2.put("type", "timeStart");
//                    jsonMessage2.put("author", "점수알리미");
//                    jsonMessage2.put("message", String.valueOf(time));
//                    String json;
//                    try {
//                        json = objectMapper.writeValueAsString(jsonMessage2);
//                        for (WebSocketSession s : sessions) {
//                            if (s.isOpen()) {
//                                s.sendMessage(new TextMessage(json));
//                            }
//                        }
//                    } catch (IOException e) {
//                        // 예외 처리
//                        System.out.println("e = " + e);
//                    }
//                    time--;
//                } else {
//                    executorService.shutdown();
//                }
//            }
//        };
//        //==========================================//


        /// chat, draw, userId, {userScore} //
        boolean gameOnGoing;
        // userIn:유저가 들어올 때 userData: (유저Id, 기본점수)
        if (type.equals("userIn")) {
            String authorization = jsonMessage.get("authorization");
            UserDto userDto = authService.selectOneMember(HeaderUtil.getAccessTokenString(authorization));
            Map<String, Object> joinRoomResponse;
            // 닉네임, 소켓 아이디을 터미너스에서 확인할 수 있도록 설정: 5/16 DG
            log.info("접속하는 유저의 닉네임: {}, 소켓 아이디(roomId): {}", userDto.getUserNickname(), roomId);

            UserInfo userInfo = userInfoMap.computeIfAbsent(session.getId(), key -> new UserInfo());

            userInfo.setNickname(userDto.getUserNickname());
            userInfo.setScore(0);
            userInfo.setToken(authorization);
            if(userDto.getUserIdx().equals(roomInfoMap.get("adminUserIdx"))){
                joinRoomResponse = roomService.firstRoom(userDto, roomId);

            } else {
                joinRoomResponse = roomService.joinRoom(userDto, roomId);
            }
            // 세션에 기록: 입장하려는 유저 인스턴스 생성

            userScoreMap.put(userDto.getUserIdx(), 0);      // Long 타입, 기본 0으로 설정

            // 방 입장 로직 수행
                // 수민 로직 추가 예정: 타입을 ReponseDto로 정상일 때 ResponseDto 정보, 오류일 때 state를 포함한 정보
            RoomResponseDto roomInfo = (RoomResponseDto) joinRoomResponse.get("roomInfo");
            String status = roomInfo.getStatus();
            String message1 = roomInfo.getMessage();

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
                log.error("answer : " + answer);

                log.error("gameInfoMap : " + gameInfoMap.toString());

                log.error("jsonMessage (202) : " + jsonMessage);
                if(answer.equals(gameInfoMap.get("correct")) && gameInfoMap.get("winnerIdx").equals("0")){
                    log.error("gameInfoMap.get(\"correct\") : "+ gameInfoMap.get("correct"));

                    String userIdx = jsonMessage.get("userIdx");
                    gameInfoMap.put("winner", userIdx);
                }
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

            // 실패일 때
            if (status.equals("fail")) {
                response.put("status", status);
                response.put("message", message1);
                String jsonResponse = objectMapper.writeValueAsString(response);
                for (WebSocketSession s : sessions) {
                    if (s.isOpen()) {
                        s.sendMessage(new TextMessage(jsonResponse));
                    }
                }
                // 성공일 때
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
        // 게임 모드 변경
        else if (type.equals("changeGameType")) {
            String changeGameType = jsonMessage.get("changeGameType");

            // 세션 데이터 변경
            roomInfoMap.put("changeGameType", changeGameType);

            // DB에 게임 타입 저장해야 함 : 구현 안됨
            webSocketCustomService.changeGameType(changeGameType);

            // 타입 설정 등
            Map<String, String> response = new HashMap<>();
            response.put("type", "changeGameType");
            response.put("changeGameType", changeGameType);
            String jsonResponse = objectMapper.writeValueAsString(response);

            for (WebSocketSession s : sessions) {
                if (s.isOpen()) {
                    s.sendMessage(new TextMessage(jsonResponse));
                }
            }
        }

        // playerCnt
        else if (type.equals("playerCnt")) {
            RoomResponseDto room = roomService.getRoom(roomId);

            int roomNow = room.getRoomNow();

            Map<String, Object> response = new HashMap<>();
            response.put("type", "playerCnt");
            response.put("playerCnt", roomNow);

            String jsonResponse = objectMapper.writeValueAsString(response);

            for (WebSocketSession s : sessions) {
                if (s.isOpen()) {
                    s.sendMessage(new TextMessage(jsonResponse));
                }
            }
        }
        // gameMode
        else if (type.equals("gameMode")) {
            RoomResponseDto room = roomService.getRoom(roomId);
            GameCategory gameCategory = room.getGameCategory();

            Map<String, Object> response = new HashMap<>();
            response.put("type", "gameMode");
            response.put("gameMode", gameCategory);

            String jsonResponse = objectMapper.writeValueAsString(response);

            for (WebSocketSession s : sessions) {
                if (s.isOpen()) {
                    s.sendMessage(new TextMessage(jsonResponse));
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
        // gameTurn
        else if (type.equals("gameTurn")) {
            RoomResponseDto room = roomService.getRoom(roomId);
            int nowRound = room.getNowRound();

            roomInfoMap.put("gameTurn", nowRound);

            Map<String, Object> response = new HashMap<>();
            response.put("type", "gameTurn");
            response.put("gameTurn", nowRound);

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

            // 소켓 정보 변경


            // userDto, gameRequestDto(roomIdx, gameCategory, maxRound) 필요
            UserDto userDto = authService.selectOneMember(HeaderUtil.getAccessTokenString(authorization));

            GameRequestDto gameRequestDto = GameRequestDto.builder()
                    .gameCategory((GameCategory) roomInfoMap.get("gameCategory"))
                    .maxRound((Integer) roomInfoMap.get("maxRound"))
                    .roomIdx(roomId)
                    .build();
            ResponseGameDto responseGameDto = gameService.startGame(userDto, gameRequestDto);

            if (responseGameDto.getStatus().equals("success")) {
                roomInfoMap.put("roomStatus", "Playing");
                gameInfoMap.put("correct", responseGameDto.getCorrect());
                gameInfoMap.put("winnerIdx", "0");
            }

            String json = objectMapper.writeValueAsString(responseGameDto);

            // 게임 정보
            for (WebSocketSession s : sessions) {
                if (s.isOpen()) {
                    s.sendMessage(new TextMessage(json));
                }
            }

//            int roundTime = (int) roomInfoMap.get("roundTime");

//            // roundTime 감소 스레드 실행
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

        // timeStart: 시간이 줄어드는 매서드
        else if (type.equals("timeStart")) {

            //== 매서드 선언부 ==//
            //시간관련 설정들
            gameOnGoing = true;
            int initialDelay = 1;
            int period = 1;
            int roundTime = (int) roomInfoMap.get("roundTime");

            //예약한 작업을 실행할 주체
            ScheduledExecutorService executorService = Executors.newSingleThreadScheduledExecutor();

            //예약한 작업
            Runnable task = new Runnable() {
                int time = roundTime;

                @Override
                public void run() {
                    if (time >= 0 && gameOnGoing == true) {
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
            executorService.scheduleAtFixedRate(task, initialDelay, period, TimeUnit.SECONDS);

        }

        // 라운드 시작
        else if (type.equals("nextRound")) {
            RequestRoundDto requestRoundDto = RequestRoundDto.builder()
                    .roomIdx(roomId)
                    .build();

            ResponseGameDto responseGameDto = gameService.nextRound(requestRoundDto);      // type: gameDto로 기본 설정되어 있음
            gameInfoMap.put("correct", responseGameDto.getCorrect());
            gameInfoMap.put("winnerIdx", "0");
            String json = objectMapper.writeValueAsString(responseGameDto);

            for (WebSocketSession s : sessions) {
                if (s.isOpen()) {
                    s.sendMessage(new TextMessage(json));
                }
            }


        }

        // 라운드 종료  ------- type 지정 필요 -------   // 수민: 임시로 내가 설정해서 사용하도록 함
        else if (type.equals("roundOver")) {
            gameOnGoing = false;        // 시간 감소 로직 중지
            Long winnerIdx = Long.valueOf(jsonMessage.get("winnerIdx"));

            gameInfoMap.put("winnerIdx", "0");
            RequestRoundDto requestRoundDto = RequestRoundDto.builder()
                    .roomIdx(roomId)
                    .winner(winnerIdx)
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
            List<UserHash> userList = roomService.getUserList(roomId);

            String json = objectMapper.writeValueAsString(userList);

            // 소켓 정보 변경
            roomInfoMap.put("roomStatus", "Ready");

            // 소켓 유저 점수 정렬해서 보여줘야 함
            List<Map.Entry<Long, Integer>> sortedEntries = new ArrayList<>(userScoreMap.entrySet());

            Collections.sort(sortedEntries, new Comparator<Map.Entry<Long, Integer>>() {
                public int compare(Map.Entry<Long, Integer> entry1, Map.Entry<Long, Integer> entry2) {
                    return entry2.getValue().compareTo(entry1.getValue());  // Integer 값을 기준으로 내림차순 정렬
                }
            });

            List<Object> sortedList = new ArrayList<>();

            // 정렬된 결과를 사용하여 작업을 수행
            for (Map.Entry<Long, Integer> entry : sortedEntries) {
                Long key = entry.getKey();
                Integer value = entry.getValue();

                // 정렬된 값을 이용한 작업 수행
                Map<String, Integer> user = new HashMap<>();            

                // Long키를 가지고 유저 닉네임을 전해줘야 함
                String nickname = userInfoMap.get(session.getId()).getNickname();
                user.put(nickname, value);
                sortedList.add(user);
            }

            Map<String, Object> response = new HashMap<>();
            response.put("type", "gameOver");
            response.put("sortedList", sortedList);

            String jsonResponse = objectMapper.writeValueAsString(response);
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
