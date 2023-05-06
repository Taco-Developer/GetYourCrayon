package com.sevenight.coldcrayon.config;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class RedisMethods {

    final RedisTemplate redisTemplate;

    // <roomIdx, userJoinList>
    public <T> List<T> getList(String key) {
        return (ArrayList<T>) redisTemplate.opsForList().range(key,0,-1);
    }

    public void setList(String key, String value){
        redisTemplate.opsForList().rightPush(key, value);
    }

    public String removeElement(String key, String value){
        redisTemplate.opsForList().remove(key, 1, value);
        return value;
    }

    public String removeList(String key){
        redisTemplate.delete(key);
        return key;
    }

    // <user, userIdx, roomIdx>
    public void setHash(String key, String hashKey, String value){
        redisTemplate.opsForHash().put(key, hashKey, value);
    }

    public String getHash(String key, String hashKey){
        return (String) redisTemplate.opsForHash().get(key, hashKey);
    }



}
