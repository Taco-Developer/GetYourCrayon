package com.sevenight.coldcrayon.config;

import com.sevenight.coldcrayon.auth.handler.CustomLogoutSuccessHandler;
import com.sevenight.coldcrayon.auth.handler.OAuth2SuccessHandler;
import com.sevenight.coldcrayon.auth.repository.RedisRepository;
import com.sevenight.coldcrayon.auth.service.CustomOAuth2UserService;
import com.sevenight.coldcrayon.auth.service.TokenService;
import com.sevenight.coldcrayon.util.CookieUtil;
import com.sevenight.coldcrayon.util.JwtAuthenticationFilter;
import com.sevenight.coldcrayon.util.RedisUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Slf4j
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig{

    private final CustomOAuth2UserService customOAuth2UserService;
    private final OAuth2SuccessHandler oAuth2SuccessHandler;
    private final TokenService tokenservice;
    private final CustomLogoutSuccessHandler logoutSuccessHandler;
    private final RedisUtil redisUtil;
    private final RedisRepository redisRepository;
    private final CookieUtil cookieUtil;

    @Bean
    protected SecurityFilterChain configure(HttpSecurity http) throws Exception{
        http
                .httpBasic().disable()
                .cors().and()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .logout()
                .logoutUrl("/member/logout")
                .logoutSuccessHandler(logoutSuccessHandler)
                .logoutSuccessUrl("/")
                .and()
                .addFilterBefore(new JwtAuthenticationFilter(tokenservice,redisUtil,cookieUtil,redisRepository), UsernamePasswordAuthenticationFilter.class)
                .oauth2Login()
                .successHandler(oAuth2SuccessHandler)
                .userInfoEndpoint()
                .userService(customOAuth2UserService);

        return http.build();

    }


    @Bean
    public WebSecurityCustomizer webSecurityCustomizer(){
        return web -> {
            web.ignoring()
                    .antMatchers(
                            "/actuator/health",
                            "/",
                            "/member/nickname",
                            "/member/nicknamecheck",
                            "/info/news");
        };
    }
}
