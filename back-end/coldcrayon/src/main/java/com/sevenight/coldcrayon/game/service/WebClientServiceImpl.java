package com.sevenight.coldcrayon.game.service;


import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class WebClientServiceImpl {

    @Value("${java.file.AIAuthorization}")
    String aIAuthorization;
    @Value("${java.file.NaverClientID}")
    String NaverClientID;
    @Value("${java.file.NaverClientSecret}")
    String NaverClientSecret;

    public Map<String, Object> AiPost(String prompt) {
        Map<String, Object> bodyMap = new HashMap<>(Map.of( "n", 4, "size", "256x256"));
        bodyMap.put("prompt", prompt);

        // webClient 기본 설정
        WebClient webClient =
                WebClient
                        .builder()
                        .baseUrl("https://api.openai.com")
                        .defaultHeaders(httpHeaders -> {
                            httpHeaders.add("Authorization", aIAuthorization);
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

    public Map<String, Object> papagoPost(String script) {

        Map<String, Object> bodyMap = new HashMap<>(Map.of( "target", "en", "source", "ko"));
        bodyMap.put("text", script);
        System.err.println(bodyMap.toString());
        System.err.println(NaverClientID);
        System.err.println(NaverClientSecret);


        // webClient 기본 설정
        WebClient webClient =
            WebClient
                .builder()
                .baseUrl("https://naveropenapi.apigw.ntruss.com")
                .defaultHeaders(httpHeaders -> {
                    httpHeaders.add("X-NCP-APIGW-API-KEY-ID", NaverClientID);
                    httpHeaders.add("X-NCP-APIGW-API-KEY", NaverClientSecret);
                    httpHeaders.add("Content-Type", "application/json");
                })
                .build();


        // api 요청
        Map<String, Object> response =
            webClient
                .post()
                .uri("/nmt/v1/translation")
                .bodyValue(bodyMap)
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        // 결과 확인
        log.info(response.toString());

        return response;
    }


}