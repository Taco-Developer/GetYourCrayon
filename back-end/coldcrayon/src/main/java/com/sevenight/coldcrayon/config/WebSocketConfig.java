package com.sevenight.coldcrayon.config;
import com.sevenight.coldcrayon.board.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.standard.ServletServerContainerFactoryBean;

@Configuration
@EnableWebSocket
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketConfigurer {

    //필요한 도메인 서비스 아래에 추가.
    private final BoardService boardService;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        WebSocketHandler webSocketHandler = new WebSocketHandler(boardService);

        registry.addHandler(webSocketHandler, "/{roomId}").setAllowedOrigins("*").addInterceptors(new HandShakeInterceptor(webSocketHandler, boardService));
    }

    @Bean
    public ServletServerContainerFactoryBean createWebSocketContainer() {
        ServletServerContainerFactoryBean container = new ServletServerContainerFactoryBean();
        container.setMaxSessionIdleTimeout(600000L); // 10분
        return container;
    }


}