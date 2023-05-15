package com.sevenight.coldcrayon.config;

import com.sevenight.coldcrayon.auth.service.AuthService;
import com.sevenight.coldcrayon.game.service.GameService;
import com.sevenight.coldcrayon.room.service.RoomService;
import com.sevenight.coldcrayon.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.config.annotation.WebSocketTransportRegistration;
import org.springframework.web.socket.server.standard.ServletServerContainerFactoryBean;

@Configuration
@EnableWebSocket
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketConfigurer {

    private final WebSocketCustomService webSocketCustomService;
    private final RoomService roomService;
    private final UserService userService;
    private final GameService gameService;
    private final AuthService authService;


    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        WebSocketHandler webSocketHandler = new WebSocketHandler(webSocketCustomService, roomService, userService, gameService, authService);
        registry.addHandler(webSocketHandler, "/{roomId}").setAllowedOrigins("*").addInterceptors(new HandShakeInterceptor(webSocketHandler));
    }

    @Bean
    public ServletServerContainerFactoryBean createWebSocketContainer() {
        ServletServerContainerFactoryBean container = new ServletServerContainerFactoryBean();
        container.setMaxSessionIdleTimeout(600000L); // 10분
        return container;
    }


}