package com.sevenight.coldcrayon.config;

import com.sevenight.coldcrayon.room.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        WebSocketHandler webSocketHandler = new WebSocketHandler();
        registry.addHandler(webSocketHandler, "/{roomId}").setAllowedOrigins("*").addInterceptors(new HandShakeInterceptor(webSocketHandler));
    }
}