package com.sevenight.coldcrayon.joinlist.service;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface JoinListService {

    public void createJoinList(String roomIdx, Long userIdx);

    public List<Object> getJoinList(String roomIdx);

    public Long removeUser(String roomIdx, Long userIdx);

    public String deleteJoinList(String roomIdx);

}
