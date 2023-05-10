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
    public void setHash(String key, String hashKey, Object object){
        redisTemplate.opsForHash().put(key, hashKey, object);
    }

    public Object getHash(String key, String hashKey){
        return  redisTemplate.opsForHash().get(key, hashKey);
    }

    public String removeHash(String key, String hashKey){
        redisTemplate.opsForHash().delete(key, hashKey);
        return key;
    }

}
