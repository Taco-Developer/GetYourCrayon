package com.sevenight.coldcrayon.config;

import lombok.RequiredArgsConstructor;
import org.hibernate.type.ClassType;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class RedisMethods {

    final RedisTemplate<String, Object> redisTemplate;

    // <roomIdx, userJoinList>
    public List<Object> getList(String key) {
        return redisTemplate.opsForList().range(key,0,-1);
    }

    public void setList(String key, Long value){
        redisTemplate.opsForList().rightPush(key, value + "");
    }

    public Long removeElement(String key, Long value){
        redisTemplate.opsForList().remove(key, 1, value + "");
        return value;
    }

    public String removeList(String key){
        redisTemplate.delete(key);
        return key;
    }

}
