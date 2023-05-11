package com.sevenight.coldcrayon.joinlist.service;

import com.sevenight.coldcrayon.config.RedisMethods;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class JoinListServiceImpl implements JoinListService{

    final RedisMethods redisMethods;
    final String key = "joinlist";

    public void createJoinList(String roomIdx, Long userIdx){
        redisMethods.setList(roomIdx, userIdx);
    }

    public List<Object> getJoinList(String roomIdx){
        return redisMethods.getList(roomIdx);
    }

    public Long removeUser(String roomIdx, Long userIdx){
        return redisMethods.removeElement(roomIdx, userIdx);
    }

    public String deleteJoinList(String roomIdx){
        return redisMethods.removeList(roomIdx);
    };
}
