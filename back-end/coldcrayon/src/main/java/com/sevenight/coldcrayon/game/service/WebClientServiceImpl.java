package com.sevenight.coldcrayon.game.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class WebClientServiceImpl {

    public Map<String, Object> post(String prompt) {
        Map<String, Object> bodyMap = new HashMap<>(Map.of( "n", 4, "size", "256x256"));
        bodyMap.put("prompt", prompt);

        // webClient 기본 설정
        WebClient webClient =
                WebClient
                        .builder()
                        .baseUrl("https://api.openai.com")
                        .defaultHeaders(httpHeaders -> {
                            httpHeaders.add("Authorization", "Bearer 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");
                            httpHeaders.add("Content-Type", "application/json");
                        })
                        .build();


        // api 요청
        Map<String, Object> response =
                webClient
                        .post()
                        .uri("/v1/images/generations")
                        .bodyValue(bodyMap)
                        .retrieve()
                        .bodyToMono(Map.class)
                        .block();

        // 결과 확인
        log.info(response.toString());

        return response;
    }
}