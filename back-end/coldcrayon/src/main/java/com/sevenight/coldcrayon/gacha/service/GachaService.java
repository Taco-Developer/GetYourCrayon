package com.sevenight.coldcrayon.gacha.service;

import com.sevenight.coldcrayon.allgacha.entity.Allgacha;
import com.sevenight.coldcrayon.allgacha.entity.GachaClass;
import com.sevenight.coldcrayon.allgacha.repository.AllgachaRepository;
import com.sevenight.coldcrayon.gacha.dto.GachaDto;
import com.sevenight.coldcrayon.gacha.entity.Gacha;
import com.sevenight.coldcrayon.gacha.repository.GachaRepository;
import com.sevenight.coldcrayon.user.dto.ResponseDto;
import com.sevenight.coldcrayon.user.dto.UserProfileDto;
import com.sevenight.coldcrayon.user.entity.User;
import com.sevenight.coldcrayon.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class GachaService {
    private final UserRepository userRepository;
    private final GachaRepository gachaRepository;
    private final AllgachaRepository allgachaRepository;

    private static int allGachaCntMin = 1;
    private static int allGachaCntMax = 20;

    public Object N_Gacha(Long userIdx, int cnt, int price) {
        Optional<User> byUserIdx = userRepository.findByUserIdx(userIdx);
        if (byUserIdx.isEmpty()) {
            log.debug("N_gacha에서 유저 정보를 찾을 수 없음");
            return "유저 정보를 찾을 수 없음";

        } else {
            Map<Long, GachaDto> gachaMap = null;
            if (byUserIdx.get().getUserPoint() >= price) {
                // 가지고 있는 모든 가챠 불러오기
//                System.err.println("여기까지는 들어오나 봅시다");
//                System.err.println(byUserIdx.get().getUserIdx());
                List<Gacha> haveAll = gachaRepository.findAllByUserIdx(byUserIdx.get());
//                log.info("haveAll = {}", haveAll.toArray().toString());
                List<Long> exist = new ArrayList<>();
                for (Gacha gacha : haveAll) {
                    exist.add(gacha.getAllgachaIdx().getAllgachaIdx());
                }
//                for (Long aLong : exist) {
//                    System.out.println("존재하나요 = " + aLong);
//                }


                Random random = new Random();
                gachaMap = new HashMap<>();

                User user = byUserIdx.get();
                int userPoint = user.getUserPoint();
                byUserIdx.get().setUserPoint(userPoint - price);
                userRepository.save(user);

                for (Long i = 1L; i < cnt + 1; i++) {
                    long gachaNumber = random.nextInt(allGachaCntMax) + allGachaCntMin;

//                    List<Object> gachaInfoList = new ArrayList<>();
//                    List<GachaDto> gachaDtoList = new ArrayList<>();
                    List<GachaDto> gachaDtoList = new ArrayList<>();
                    GachaDto gachaDto = new GachaDto();


                    Optional<Allgacha> allgacha = allgachaRepository.findByAllgachaIdx(gachaNumber);

                    if (allgacha.isEmpty()) {
                        return "allgacha 정보를 찾을 수 없음";
                    } else {
                        Gacha gacha = new Gacha();
                        gacha.setAllgachaIdx(allgacha.get());
                        gacha.setUserIdx(user);

                        if (exist.contains(gachaNumber)) {
                            gachaDto.setExistGacha(false);
//                            System.err.println("있음");
//                            System.out.println("gachaNumber = " + gachaNumber);
                        } else {
                            gachaDto.setExistGacha(true);
                            gachaRepository.save(gacha);
//                            System.err.println("없음");
                        }

                        // 리턴을 위한 저장
                        gachaDto.setGachaIdx(allgacha.get().getAllgachaIdx());
                        gachaDto.setGachaImg(allgacha.get().getAllgachaImg());
                        gachaDto.setGachaClass(allgacha.get().getAllgachaClass());

                        log.info("gachaDto ={}", gachaDto);
                        gachaMap.put(i, gachaDto);
//                        gachaInfoList.add(i + "번째로 뽑힌 값");
//                        gachaInfoList.add(allgacha.get().getAllgachaImg());
//                        gachaInfoList.add(allgacha.get().getAllgachaClass());
//                        gachaMap.put(i, gachaInfoList);
                    }
                }
                return gachaMap;

            } else {
                return "포인트가 부족합니다";
            }
        }
    }

    public ResponseDto gachaMain(Long userIdx) {
        Map<String, Object> result = new HashMap<>();
        ResponseDto responseDto = new ResponseDto();

        Optional<User> byUserIdx = userRepository.findByUserIdx(userIdx);
        if (byUserIdx.isEmpty()) {
            responseDto.setMessage("유저 Idx를 찾을 수 없음");
            responseDto.setStatusCode(400);
        } else {
            UserProfileDto userProfileDto = UserProfileDto.builder()
                    .userIdx(byUserIdx.get().getUserIdx())
                    .userNickname(byUserIdx.get().getUserNickname())
                    .userProfile(byUserIdx.get().getUserProfile())
                    .userPoint(byUserIdx.get().getUserPoint())
                    .build();

            result.put("profile", userProfileDto);
            responseDto.setMessage("유저 프로필 정보");
            responseDto.setStatusCode(200);
            responseDto.setBody(result);
        }

        return responseDto;
    }

    public ResponseDto gachaOnce(Long userIdx) {
        Map<String, Object> result = new HashMap<>();
        ResponseDto responseDto = new ResponseDto();

        Optional<User> byUserIdx = userRepository.findByUserIdx(userIdx);
        if (byUserIdx.isEmpty()) {
            responseDto.setMessage("유저 Idx를 찾을 수 없음");
            responseDto.setStatusCode(400);
        } else {
            int userPoint = byUserIdx.get().getUserPoint();
            if (userPoint >= 10) {
                // 뽑기 메서드 실행(for 한 개)
                Object nGacha = N_Gacha(byUserIdx.get().getUserIdx(), 1, 10);
                log.info("nGachas 결과: {}", nGacha);

                result.put("nGachasIdx", nGacha);
                responseDto.setBody(result);
                responseDto.setMessage("1회 뽑기 실행");
                responseDto.setStatusCode(200);
            } else {
                responseDto.setMessage("1회 뽑기 포인트 부족");
                responseDto.setBody("현재 유저 포인트: " + userPoint);
                responseDto.setStatusCode(600);     // 유저 오류: 600번대
            }
        }
        return responseDto;
    }

    public ResponseDto gachaTenth(Long userIdx) {
        Map<String, Object> result = new HashMap<>();
        ResponseDto responseDto = new ResponseDto();

        Optional<User> byUserIdx = userRepository.findByUserIdx(userIdx);
        if (byUserIdx.isEmpty()) {
            responseDto.setMessage("유저 Idx를 찾을 수 없음");
            responseDto.setStatusCode(400);
        } else {
            int userPoint = byUserIdx.get().getUserPoint();
            if (userPoint >= 100) {
                // 뽑기 메서드 실행(for 열 개)
                Object nGacha = N_Gacha(byUserIdx.get().getUserIdx(), 10, 100);
                log.info("nGachas 결과: {}", nGacha);
                result.put("nGacha", nGacha);

                responseDto.setBody(result);
                responseDto.setMessage("10회 뽑기 실행");
                responseDto.setStatusCode(200);

            } else {
                responseDto.setBody("현재 유저 포인트: " + userPoint);
                responseDto.setMessage("10회 뽑기 포인트 부족");
                responseDto.setStatusCode(600);     // 유저 오류: 600번대
            }
        }
        return responseDto;
    }
}
