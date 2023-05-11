package com.sevenight.coldcrayon.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
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

    private final Map<String, List<WebSocketSession>> sessionsMap = new ConcurrentHashMap<>();  // 세션 연결 정보: Map<방id, List<세션>>
    private final Map<String, Map<WebSocketSession, Integer>> userScoreMap = new ConcurrentHashMap<>();  // 세션 연결 정보 + 유저 점수: Map<방id, Map<세션, 점수>>

    private int flag = 0;   // afterConnectionEstablished이 한번만 호출 될 때 사용할 수 있도록 변수 사용


    // 2번씩 호출되는 이유: '클라이언트 -> 서버' / '서버 -> 클라이언트'의 경우에서 호출되기 때문 ??
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String roomId = extractRoomId(session);  // 유저가 접속한 방id

        ///
        // 첫번째 호출(클라이언트->서버)일 때만 유저 정보가 추가될 수 있도록 함
        if (flag == 0) {
            flag = 1;
            System.out.println("flag == 1");

            // roomId 키로 검색한 정보가 userScoreMap에 존재하지 않을 때 새로 만들어 suerScoreMap에 추가
            Map<WebSocketSession, Integer> scores = userScoreMap.computeIfAbsent(roomId, key -> new ConcurrentHashMap<>());
            scores.put(session, 1000);  // scores에 세션과 점수(0)을 저장: Map<세션, 점수>
            userScoreMap.put(session.getId(), scores);

            // roomId에 접속중인 유저 리스트를 모두 출력
            for (Map<WebSocketSession, Integer> valueMap : userScoreMap.values()) {
                for (WebSocketSession s : valueMap.keySet()) {
                    System.out.println(s.getId());
                }
            }

        } else {
            flag = 0;
        }
        ///

        // computeIfAbsent: 주어진 키가 Map에 roomId 키가 존재하지 않으면 새로운 값 생성후 sessionMap에 추가
        List<WebSocketSession> sessions = sessionsMap.computeIfAbsent(roomId, key -> new CopyOnWriteArrayList<>());
        sessions.add(session);  // roomId로 검색된 방 연결 정보에 현재 연결 세션을 추가


    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String roomId = extractRoomId(session);
        List<WebSocketSession> sessions = sessionsMap.getOrDefault(roomId, Collections.emptyList());

        Map<WebSocketSession, Integer> scores = userScoreMap.getOrDefault(roomId, Collections.emptyMap());  // <세션, 점수>

        // JSON 파싱을 위한 ObjectMapper 객체 생성
        ObjectMapper objectMapper = new ObjectMapper();

        // 메시지 내용을 JSON으로 파싱하여 Map 형태로 변환
        Map<String, String> jsonMessage = objectMapper.readValue(message.getPayload(), new TypeReference<Map<String, String>>() {});

        // JSON에서 author와 message 값을 추출
        String author = jsonMessage.get("clientId");
        String content = jsonMessage.get("content");

        for (WebSocketSession s : sessions) {
            if (s.isOpen()) {
                s.sendMessage(message);
            }
        }

        // 메시지 내용을 분석하여 점수를 업데이트하는 작업을 수행합니다.

        if (content.equals("increase")) {
            // 점수 증가 로직
            Integer score = scores.get(session);
            scores.put(session, score + 1);
        } else if (content.equals("decrease")) {
            // 점수 감소 로직
            Integer score = scores.get(session);
            scores.put(session, score - 1);
        }
        else if (content.equals("show_scores")) {
            // 업데이트된 점수를 모든 세션에게 전송합니다.
            for (WebSocketSession s : sessions) {
                if (s.isOpen()) {
                    // 업데이트된 점수를 전송
                    Integer score = scores.get(s);
                    String scoreMessage = "Score: " + score;// ObjectMapper 객체 생성

                    // 원하는 데이터를 JSON 형식으로 변환
                    Map<String, String> jsonMessage2 = new HashMap<>();
                    jsonMessage2.put("clientId", "현재 세션의 점수");
                    jsonMessage2.put("content", scoreMessage);
                    String json = objectMapper.writeValueAsString(jsonMessage2);

                    // WebSocket 메시지로 전송
                    s.sendMessage(new TextMessage(json));
                }
            }
        }
    }


    // 유저의 소켓 연결이 끊어졌을 때 실행
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


        ///
        ///
    }

    private String extractRoomId(WebSocketSession session) {
        String path = session.getUri().getPath();
        return path.substring(path.lastIndexOf('/') + 1);
    }
}