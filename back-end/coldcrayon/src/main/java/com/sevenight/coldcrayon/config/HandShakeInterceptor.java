package com.sevenight.coldcrayon.config;

import com.sevenight.coldcrayon.board.entity.Board;
import com.sevenight.coldcrayon.board.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.nio.charset.StandardCharsets;
import java.util.Map;
@RequiredArgsConstructor
public class HandShakeInterceptor implements HandshakeInterceptor {

    private final WebSocketHandler webSocketHandler;

    //필요한 도메인 서비스 아래에 추가.
    private final BoardService boardService;


    private boolean isNumeric(String str) {
        return str.matches("-?\\d+(\\.\\d+)?");
    }

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, org.springframework.web.socket.WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        String path = request.getURI().getPath();
        String roomId = path.substring(path.lastIndexOf('/') + 1);

        Board board = boardService.findById(1).get();
        System.out.println("board = " + board.getBoardTitle());


//        Map<String, List<WebSocketSession>> sessionsMap = webSocketHandler.getSessionsMap();
//        // sessionsMap에 접근하여 원하는 작업 수행
//        List<WebSocketSession> sessions = sessionsMap.getOrDefault(roomId, Collections.emptyList());
//        System.out.println("Sessions for roomId " + roomId + ":");
//        for (WebSocketSession session : sessions) {
//            System.out.println(session.getId());
//        }

        // 숫자인 경우 연결 거부
        if (isNumeric(roomId)) {
            response.setStatusCode(HttpStatus.FORBIDDEN);
            response.getHeaders().setContentType(MediaType.TEXT_PLAIN);
            String reason = "연결이 거부되었습니다.";
            response.getBody().write(reason.getBytes(StandardCharsets.UTF_8));
            response.flush();
            return false;
        }
        return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, org.springframework.web.socket.WebSocketHandler wsHandler, Exception exception) {

    }
}
