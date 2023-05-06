package com.sevenight.coldcrayon.joinlist.service;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface JoinListService {

    public void createJoinList(String roomIdx, String userIdx);

    public List<String> getJoinList(String roomIdx);

    public String removeUser(String roomIdx, String userIdx);

    public String deleteJoinList(String roomIdx);

}
