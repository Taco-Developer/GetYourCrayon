package com.sevenight.coldcrayon.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Map;

public class HandShakeInterceptor implements HandshakeInterceptor {
    private final WebSocketHandler webSocketHandler;

    public HandShakeInterceptor(WebSocketHandler webSocketHandler) {
        this.webSocketHandler = webSocketHandler;
    }

    private boolean isNumeric(String str) {
        return str.matches("-?\\d+(\\.\\d+)?");
    }

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, org.springframework.web.socket.WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        String path = request.getURI().getPath();
        String roomId = path.substring(path.lastIndexOf('/') + 1);

//        System.out.println(roomId);
//
//        Map<String, List<WebSocketSession>> sessionsMap = webSocketHandler.getSessionsMap();
//        // sessionsMap에 접근하여 원하는 작업 수행
//        List<WebSocketSession> sessions = sessionsMap.getOrDefault(roomId, Collections.emptyList());
//        System.out.println("Sessions for roomId " + roomId + ":");
//        for (WebSocketSession session : sessions) {
//            System.out.println(session.getId());
//        }



        // 숫자인 경우 연결 거부
//        if (isNumeric(roomId)) {
//            response.setStatusCode(HttpStatus.FORBIDDEN);
//            return false;
//        }

        return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, org.springframework.web.socket.WebSocketHandler wsHandler, Exception exception) {

    }
}
