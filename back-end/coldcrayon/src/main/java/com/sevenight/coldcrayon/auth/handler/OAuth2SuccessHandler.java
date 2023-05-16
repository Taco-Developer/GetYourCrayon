package com.sevenight.coldcrayon.auth.handler;

import com.sevenight.coldcrayon.auth.entity.Role;
import com.sevenight.coldcrayon.auth.repository.RedisRepository;
import com.sevenight.coldcrayon.auth.service.TokenService;
import com.sevenight.coldcrayon.user.entity.User;
import com.sevenight.coldcrayon.user.repository.UserRepository;
import com.sevenight.coldcrayon.util.CookieUtil;
import com.sevenight.coldcrayon.util.RedisUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final TokenService tokenservice;
    private final UserRepository memberRepository;
    private final RedisUtil redisUtil;
    private final CookieUtil cookieUtil;
    private final RedisRepository redisRepository;
    // 체크하기 => 형들 yml 보기
    @Value("${redirect.url}")
    private String redirectUrl;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        log.info("Principal에서 꺼낸 OAuth2User = {} ", oAuth2User);

        log.info("DB 등록 확인");

        // 등록되지 않은 회원일경우 회원가입
        User member = memberRepository.findByUserEmail((String) oAuth2User.getAttribute("email"));
        if (oAuth2User != null && member == null) {
            User memberData = createMember(oAuth2User);
            if(memberData == null) {
                log.info("회원 가입 실패");
            } else {
                log.info("유저를 찾을 수 없습니다. 유저 정보를 등록합니다.");
//                createMemberAsset(memberData);
//                log.info("유저 기본 자산 정보 테이블을 생성합니다.");
            }
        }

        // 다른 소셜로 등록된 회원이면 error페이지 리턴
        if (member != null && !member.getUserProvider().equals(oAuth2User.getAttribute("provider"))) {
            log.info("다른 소셜에 등록된 회원입니다");
            getRedirectStrategy().sendRedirect(request, response, UriComponentsBuilder.fromUriString("/error")
                    .build().toUriString());
            return;
        }
        String nickname = memberRepository.findByUserEmail((String) oAuth2User.getAttribute("email")).getUserNickname();
        log.debug("nickname = {}", nickname);
        // 닉네임 작성 여부 확인
        if (nickname == null) {
            // 닉네임 설정 화면으로
            log.debug("닉네임 설정 화면으로");
            getRedirectStrategy().sendRedirect(request, response, UriComponentsBuilder.fromUriString(redirectUrl + "/redirect")
                    .build().toUriString());
//            getRedirectStrategy().sendRedirect(request, response, UriComponentsBuilder.fromUriString(redirectUrl + "/login/nickname")
//                    .queryParam("email", (String) oAuth2User.getAttribute("email"))
//                    .build().toUriString());
        } else {
            // 만약 해당 이메일로 리프레쉬 토큰이 존재한다면 삭제
            if (redisUtil.getData((String) oAuth2User.getAttribute("email")) != null) {
                log.info("refresh token exists.Remove refresh token");
                redisRepository.deleteById((String) oAuth2User.getAttribute("email"));
            }

            // 리프레쉬 토큰 생성 후 Redis에 등록
            String refreshtoken = tokenservice.generateToken((String) oAuth2User.getAttribute("email"), "ROLE_MEMBER", nickname, "REFRESH");
            redisUtil.setDataExpire((String) oAuth2User.getAttribute("email"), refreshtoken, TokenService.refreshPeriod);

            // Response Cookie에 리프레쉬 토큰 적재, access token 생성
            ResponseCookie cookie = cookieUtil.getCookie(refreshtoken, TokenService.refreshPeriod);
            String accesstoken = tokenservice.generateToken(oAuth2User.getAttribute("email"), "ROLE_MEMBER", nickname, "ACCESS");

            log.info("accecss_Token = {}", accesstoken);
            log.info("refresh_Token = {}", refreshtoken);
            response.setContentType("application/json;charset=UTF-8");
            // Authorization 헤더필드에 accesstoken 적재 , Set-Cookkie 헤더 필드에 리프레쉬 토큰 cookie 적재
            response.setHeader("Set-Cookie", cookie.toString());


            // 메인으로
            log.debug("메인으로");
            getRedirectStrategy().sendRedirect(request, response, UriComponentsBuilder.fromUriString(redirectUrl + "/redirect")
                    .queryParam("accesstoken", accesstoken)
                    .build().toUriString());
        }
    }

    // 회원 가입시 회원 테이블 생성
    public User createMember(OAuth2User oAuth2User) {
        return memberRepository.saveAndFlush(User.builder()
                .userEmail((String) oAuth2User.getAttribute("email"))
                .role(Role.MEMBER)
                .userProvider(oAuth2User.getAttribute("provider"))
                .userPoint(100)
                .userNickname("익명이" + UUID.randomUUID().toString().substring(0, 7))
                .build());
    }

}

