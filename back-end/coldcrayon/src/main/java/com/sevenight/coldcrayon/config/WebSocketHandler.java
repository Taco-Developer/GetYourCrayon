package com.sevenight.coldcrayon.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sevenight.coldcrayon.auth.dto.UserDto;
import com.sevenight.coldcrayon.board.entity.Board;
import com.sevenight.coldcrayon.board.repository.BoardRepository;
import com.sevenight.coldcrayon.board.service.BoardService;
import com.sevenight.coldcrayon.room.dto.RoomDto;
import com.sevenight.coldcrayon.room.service.RoomService;
import com.sevenight.coldcrayon.user.service.UserService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.reactive.socket.server.WebSocketService;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

public class WebSocketHandler extends TextWebSocketHandler {
    private final Map<String, List<WebSocketSession>> sessionsMap = new ConcurrentHashMap<>();
    private final Map<String, UserInfo> userInfoMap = new ConcurrentHashMap<>();

    // 외부 서비스 주입
    private WebSocketCustomService webSocketCustomService;
    private RoomService roomService;
    private UserService userService;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String roomId = extractRoomId(session);
        List<WebSocketSession> sessions = sessionsMap.computeIfAbsent(roomId, key -> new CopyOnWriteArrayList<>());
        sessions.add(session);
        System.out.println(session.getId());

    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String roomId = extractRoomId(session);
        List<WebSocketSession> sessions = sessionsMap.getOrDefault(roomId, Collections.emptyList());

        // JSON 파싱을 위한 ObjectMapper 객체 생성
        ObjectMapper objectMapper = new ObjectMapper();
        // 메시지 내용을 JSON으로 파싱하여 Map 형태로 변환
        Map<String, String> jsonMessage = objectMapper.readValue(message.getPayload(), new TypeReference<Map<String, String>>(){});
        String type = jsonMessage.get("type");

        /// chat, draw, userId, {userScore} //

        // userIn:유저가 들어올 때 userData: (유저Id, 기본점수)
        if (type.equals("userIn")) {
            
            // 최대인원 확인: 현재인원이 최대인원보다 작을 때 true, 같거나 클 경우 false
            boolean enable = webSocketCustomService.checkEnableEnter(roomId);

            if (!enable) {  // 입장불가(최대인원 <= 현재인원): false 전송
                for (WebSocketSession s : sessions) {
                    if (s.isOpen()) {
                        s.sendMessage(new TextMessage("false"));
                    }
                }
            } else {  // 입장가능: true
                // 프론트 전송 확인 필요
                String userNickname = jsonMessage.get("userNickname");
                String userIdx = jsonMessage.get("userIdx");  // userIdx: 유저 번호(Long): userId가 닉네임? 주소? user_idx?

                // 입장하려는 유저를 DB에 저장
                webSocketCustomService.userRoomIn(roomId, Long.valueOf(userIdx));

                // userId를 통해 UserDTO 만들기
                UserDto userDto = webSocketCustomService.makeUserDto(Long.valueOf(userIdx));

                // roomService.joinRoom 실행
                roomService.joinRoom(userDto, roomId);

                // #1 입장하려는 유저 인스턴스 생성 -> 세션에 기록
                UserInfo userInfo = userInfoMap.computeIfAbsent(session.getId(), key -> new UserInfo());
                userInfo.setNickname(userNickname);
                userInfo.setScore(0);
                userInfoMap.put(session.getId(), userInfo);

                //== 방에 있는 정보를 전송 ==//
                for (WebSocketSession s : sessions) {
                    if (s.isOpen()) {
                        // 방에 있는 유저 정보(userInfoMap) 전송: <세션, 유저Info(유저 닉네임, 유저 점수)>
                        List<UserInfo> allUserInfo = new ArrayList<>(userInfoMap.values());
                        String userJson = objectMapper.writeValueAsString(allUserInfo);
                        
                        // 현재 방 정보
                        RoomDto roomDto = roomService.getRoom(roomId);

                        // 정보 전송
                        Map<String, Object> combinedJson = new HashMap<>();
                        combinedJson.put("room", roomDto);
                        combinedJson.put("users", userJson);
                        String json = objectMapper.writeValueAsString(combinedJson);

                        s.sendMessage(new TextMessage(json));
                    }
                }
            }
        }
        else if (type.equals("chat")) {
            for (WebSocketSession s : sessions) {
                if (s.isOpen()) {
                    s.sendMessage(message);
                }
            }
        }
        else if (type.equals("draw")) {
            for (WebSocketSession s : sessions) {
                if (s.isOpen()) {
                    s.sendMessage(message);
                }
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String roomId = extractRoomId(session);
        List<WebSocketSession> sessions = sessionsMap.getOrDefault(roomId, Collections.emptyList());

        String i = userInfoMap.get(session.getId()).getNickname();
        sessions.remove(session);
        userInfoMap.remove(session.getId());

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
                jsonMessage.put("message", i+ "님이 나갔습니다");
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
        public UserInfo() {};
        public UserInfo(String nickname, int score) {
            this.nickname = nickname;
            this.score = score;
        }
    }
}
