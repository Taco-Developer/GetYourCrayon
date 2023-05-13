package com.sevenight.coldcrayon.user.service;

import com.sevenight.coldcrayon.allgacha.dto.AllgachaDto;
import com.sevenight.coldcrayon.allgacha.entity.Allgacha;
import com.sevenight.coldcrayon.allgacha.entity.GachaClass;
import com.sevenight.coldcrayon.allgacha.repository.AllgachaRepository;
import com.sevenight.coldcrayon.gacha.dto.*;
import com.sevenight.coldcrayon.gacha.entity.Gacha;
import com.sevenight.coldcrayon.gacha.repository.GachaRepository;
import com.sevenight.coldcrayon.user.dto.ResponseDto;
import com.sevenight.coldcrayon.user.dto.UserCollectionDto;
import com.sevenight.coldcrayon.user.dto.UserProfileDto;
import com.sevenight.coldcrayon.user.entity.User;
import com.sevenight.coldcrayon.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.sound.midi.SysexMessage;
import javax.swing.text.html.Option;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final AllgachaRepository allgachaRepository;
    private final GachaRepository gachaRepository;

    public ResponseDto myPage(Long userIdx) {
        Map<String, Object> result = new HashMap<>();
        ResponseDto responseDto = new ResponseDto();

        Optional<User> byUserIdx = userRepository.findByUserIdx(userIdx);
        if (byUserIdx.isEmpty()) {
            responseDto.setMessage("마이 페이지로 이동할 수 없습니다: 유저 Idx를 찾을 수 없음");
            responseDto.setStatusCode(500);
        } else {
            UserProfileDto userProfileDto = UserProfileDto.builder()
                    .userIdx(byUserIdx.get().getUserIdx())
                    .userNickname(byUserIdx.get().getUserNickname())
                    .userProfile(byUserIdx.get().getUserProfile())
                    .userPoint(byUserIdx.get().getUserPoint())
                    .build();

            // 유저가 가지고 있는 가챠 모음인듯?
            List<Gacha> userGachas = byUserIdx.get().getUserGachas();
            List<Object> collectionsInfo = new ArrayList<>();

            Map<String, List> gachaMap = new HashMap<>();

            List<NormalDto> normalDtoList = new ArrayList<>();
            List<RareDto> rareDtoList = new ArrayList<>();
            List<SuperRareDto> superRareDtoList = new ArrayList<>();
            List<EventDto> eventDtoList = new ArrayList<>();

//            normalDto.add(new NormalDto().setGachaImg(userGacha.getAllgachaIdx().getAllgachaImg()));

            for (Gacha userGacha : userGachas) {
                System.err.println("가지고 있는 가챠의 아이디 = " + userGacha.getGachaIdx());
                System.err.println("가지고 있는 가챠 이미지 = " + userGacha.getAllgachaIdx().getAllgachaImg());
                System.err.println("가지고 있는 가챠 클래스= " + userGacha.getAllgachaIdx().getAllgachaClass());
                System.err.println("가지고 있는 가챠 클래스 의 타입= " +
                        userGacha.getAllgachaIdx().getAllgachaClass().getClass().getName());
                if (userGacha.getAllgachaIdx().getAllgachaClass() == GachaClass.NORMAL) {
                    NormalDto normalDto = new NormalDto();
                    normalDto.setGachaImg(userGacha.getAllgachaIdx().getAllgachaImg());
                    normalDtoList.add(normalDto);
                } else if (userGacha.getAllgachaIdx().getAllgachaClass() == GachaClass.RARE) {
                    RareDto rareDto = new RareDto();
                    rareDto.setGachaImg(userGacha.getAllgachaIdx().getAllgachaImg());
                    rareDtoList.add(rareDto);
                } else if (userGacha.getAllgachaIdx().getAllgachaClass() == GachaClass.SUPERRARE) {
                    SuperRareDto superRareDto = new SuperRareDto();
                    superRareDto.setGachaImg(userGacha.getAllgachaIdx().getAllgachaImg());
                    superRareDtoList.add(superRareDto);
                } else if (userGacha.getAllgachaIdx().getAllgachaClass() == GachaClass.EVENT) {
                    EventDto eventDto = new EventDto();
                    eventDto.setGachaImg(userGacha.getAllgachaIdx().getAllgachaImg());
                    eventDtoList.add(eventDto);
                }
            }

            gachaMap.put("normal", normalDtoList);
            gachaMap.put("rare", rareDtoList);
            gachaMap.put("superRare", superRareDtoList);
            gachaMap.put("event", eventDtoList);

            collectionsInfo.add(gachaMap);

//            for (int i = 0; i<userGachas.size(); i++) {
//                Long allgachaIdx = userGachas.get(i).getAllgachaIdx().getAllgachaIdx();
//                Optional<Allgacha> byAllgachaIdx = allgachaRepository.findByAllgachaIdx(allgachaIdx);
//
//                Long allgachaIdxLong = byAllgachaIdx.get().getAllgachaIdx();
//                String allgachaImg = byAllgachaIdx.get().getAllgachaImg();
//                GachaClass allgachaClass = byAllgachaIdx.get().getAllgachaClass();
//
//                AllgachaDto allgachaDto = AllgachaDto.builder()
//                        .allgachaIdx(allgachaIdxLong)
//                        .allgachaClass(allgachaClass)
//                        .allgachaImg(allgachaImg)
//                        .build();
//
//                collectionsInfo.add(allgachaDto);
//            }

            result.put("profile", userProfileDto);
            result.put("gacha", collectionsInfo);
            responseDto.setMessage("유저 프로필 정보");
            responseDto.setStatusCode(200);
            responseDto.setBody(result);

        }
        return responseDto;
    }

    public ResponseDto changeUserNickname(Long userIdx, String changeNickname) {
        ResponseDto responseDto = new ResponseDto();

        Optional<User> byUserNickname = userRepository.findByUserIdx(userIdx);
        if (byUserNickname.isEmpty()) {
            responseDto.setMessage("유저 정보를 찾을 수 없음");
            responseDto.setStatusCode(400);
        } else {
            User user = byUserNickname.get();
            String prevUserNickname = user.getUserNickname();
            user.setUserNickname(changeNickname);
            userRepository.save(user);

            String newUserNickname = user.getUserNickname();
            responseDto.setBody("기존 닉네임: " + prevUserNickname + ", 변경된 닉네임: " + newUserNickname);
            responseDto.setMessage("유저 인덱스 번호: " + userIdx + "번 유저의 닉네임을 " + changeNickname + "으로 변경");
            responseDto.setStatusCode(200);
        }
        return responseDto;
    }

    public ResponseDto changeUserProfileImg(long userIdx, String newProfileImg) {
        ResponseDto responseDto = new ResponseDto();

        Optional<User> byUserNickname = userRepository.findByUserIdx(userIdx);
        if (byUserNickname.isEmpty()) {
            responseDto.setMessage("유저 정보을 찾을 수 없음");
            responseDto.setStatusCode(400);
        } else {
            User user = byUserNickname.get();
            String prevUserProfile = user.getUserProfile();
            user.setUserProfile(newProfileImg);
            userRepository.save(user);

            String newUserProfile = user.getUserProfile();
            responseDto.setBody("기존 이미지: " + prevUserProfile + ", 변경된 이미지: " + newUserProfile);
            responseDto.setMessage("유저 인덱스 번호: " + userIdx + "번 유저의 프로필 사진을 " + newProfileImg + "으로 변경");
            responseDto.setStatusCode(200);
        }
        return responseDto;
    }

}
