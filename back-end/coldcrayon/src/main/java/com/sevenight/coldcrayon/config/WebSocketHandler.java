package com.sevenight.coldcrayon.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

public class WebSocketHandler extends TextWebSocketHandler {
    private final Map<String, List<WebSocketSession>> sessionsMap = new ConcurrentHashMap<>();
    private final Map<String, Map<WebSocketSession, Integer>> userScoreMap = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String roomId = extractRoomId(session);
        List<WebSocketSession> sessions = sessionsMap.computeIfAbsent(roomId, key -> new CopyOnWriteArrayList<>());
        sessions.add(session);

        Map<WebSocketSession, Integer> scores = userScoreMap.computeIfAbsent(roomId, key -> new ConcurrentHashMap<>());
        scores.put(session, 0);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // 접속하는 유저 정보를 담기

        // =====================

        String roomId = extractRoomId(session);
        List<WebSocketSession> sessions = sessionsMap.getOrDefault(roomId, Collections.emptyList());
        Map<WebSocketSession, Integer> scores = userScoreMap.getOrDefault(roomId, Collections.emptyMap());

        // JSON 파싱을 위한 ObjectMapper 객체 생성
        ObjectMapper objectMapper = new ObjectMapper();

        // 메시지 내용을 JSON으로 파싱하여 Map 형태로 변환
        Map<String, String> jsonMessage = objectMapper.readValue(message.getPayload(), new TypeReference<Map<String, String>>() {});

        // JSON에서 author와 message 값을 추출
        String author = jsonMessage.get("author");
        String content = jsonMessage.get("message");

        for (WebSocketSession s : sessions) {
            if (s.isOpen()) {
                s.sendMessage(message);
            }
        }

        // 메시지 내용을 분석하여 점수를 업데이트하는 작업을 수행합니다.


        for (WebSocketSession s : sessions) {
            if (s.isOpen()) {
                // 업데이트된 점수를 전송
                Integer score = scores.get(s);
                String scoreMessage = "Score: " + score;// ObjectMapper 객체 생성

                // 원하는 데이터를 JSON 형식으로 변환
                Map<String, String> jsonMessage2 = new HashMap<>();
                jsonMessage2.put("author", "점수알리미");
                jsonMessage2.put("message", scoreMessage);
                String json = objectMapper.writeValueAsString(jsonMessage2);

                // WebSocket 메시지로 전송
                s.sendMessage(new TextMessage(json));
            }
        }

    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String roomId = extractRoomId(session);
        List<WebSocketSession> sessions = sessionsMap.getOrDefault(roomId, Collections.emptyList());
        sessions.remove(session);

        Map<WebSocketSession, Integer> scores = userScoreMap.getOrDefault(roomId, Collections.emptyMap());
        scores.remove(session);

        if (sessions.isEmpty()) {
            sessionsMap.remove(roomId);
            userScoreMap.remove(roomId);
        }

//            for (WebSocketSession s : sessions) {
//                if (s.isOpen()) {
//                    // ObjectMapper 객체 생성
//                    ObjectMapper objectMapper = new ObjectMapper();
//
//                    // 원하는 데이터를 JSON 형식으로 변환
//                    Map<String, String> jsonMessage = new HashMap<>();
//                    jsonMessage.put("author", "나가는사람");
//                    jsonMessage.put("message", "나 나가요");
//                    String json = objectMapper.writeValueAsString(jsonMessage);
//
//                    // WebSocket 메시지로 전송
//                    s.sendMessage(new TextMessage(json));
//                }
//            }

    }

    private String extractRoomId(WebSocketSession session) {
        String path = session.getUri().getPath();
        return path.substring(path.lastIndexOf('/') + 1);
    }
}