package com.sevenight.coldcrayon.joinlist.service;

import com.sevenight.coldcrayon.config.RedisUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class JoinListServiceImpl implements JoinListService{

    final RedisUtil redisUtil;
    final String key = "joinlist";

    public void createJoinList(String roomIdx, String userIdx){
        redisUtil.setList(roomIdx, userIdx);
    }

    public List<String> getJoinList(String roomIdx){
        return redisUtil.getList(roomIdx);
    }

    public String removeUser(String roomIdx, String userIdx){
        return redisUtil.removeElement(roomIdx, userIdx);
    }

    public String deleteJoinList(String roomIdx){
        return redisUtil.removeList(roomIdx);
    };
}
