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
    private static final double NORMAL_RATING_MAX = 0.8;
    private static final double NORMAL_RATING_MIN = 0.2;
    private static final double RARE_RATING = 0.15;
    private static final double SUPER_RARE_RATING = 0.05;
    private static final double EVENT_PROBABILITY = 0.00001;
    private final UserRepository userRepository;
    private final GachaRepository gachaRepository;
    private final AllgachaRepository allgachaRepository;

    private static int allGachaCntMin;
    private static int allGachaCntMax;

    public Void randomGacha() {
        Random random = new Random();
        double eventProbabilityThreshold = random.nextDouble();

        log.info("이벤트 체크 난수값 = {}", eventProbabilityThreshold);
        if (eventProbabilityThreshold >= EVENT_PROBABILITY) {
            double rarityThreshold = random.nextDouble();
            log.info("그 외 체크 난수값 = {}",rarityThreshold);
            if (NORMAL_RATING_MIN <= rarityThreshold && rarityThreshold <= NORMAL_RATING_MAX) {
                log.info("노말 가챠 생성");
                allGachaCntMin = 1;
                allGachaCntMax = 22;

            } else if (rarityThreshold >= RARE_RATING) {
                log.info("레어 가챠 생성");
                allGachaCntMin = 23;
                allGachaCntMax = 40;

            } else if (rarityThreshold >= SUPER_RARE_RATING) {
                log.info("슈퍼레어 가챠 생성");
                allGachaCntMin = 41;
                allGachaCntMax = 58;

            }
        } else {
            log.info("이벤트 가챠 생성");
            allGachaCntMin = 59;
            allGachaCntMax = 94;
        }
        return null;
    }
    public Object N_Gacha(Long userIdx, int cnt, int price) {
        Optional<User> byUserIdx = userRepository.findByUserIdx(userIdx);
        if (byUserIdx.isEmpty()) {
            log.debug("N_gacha에서 유저 정보를 찾을 수 없음");
            return "유저 정보를 찾을 수 없음";

        } else {
            Map<Long, GachaDto> gachaMap = null;
            ArrayList<GachaDto> gachaList = new ArrayList<>();
            if (byUserIdx.get().getUserPoint() >= price) {
                // 가지고 있는 모든 가챠 불러오기
                List<Gacha> haveAll = gachaRepository.findAllByUserIdx(byUserIdx.get());
                List<Long> exist = new ArrayList<>();
                for (Gacha gacha : haveAll) {
                    exist.add(gacha.getAllgachaIdx().getAllgachaIdx());
                }
                Random random = new Random();

                gachaMap = new HashMap<>();

                User user = byUserIdx.get();
                int userPoint = user.getUserPoint();
                byUserIdx.get().setUserPoint(userPoint - price);
                userRepository.save(user);

                for (Long i = 1L; i < cnt + 1; i++) {
                    randomGacha();
//                    long gachaNumber = random.nextInt(allGachaCntMax) + allGachaCntMin;
                    long gachaNumber = random.nextInt((allGachaCntMax - allGachaCntMin) + 1) + allGachaCntMin;

                    List<GachaDto> gachaDtoList = new ArrayList<>();
                    GachaDto gachaDto = new GachaDto();


                    Optional<Allgacha> allgacha = allgachaRepository.findByAllgachaIdx(gachaNumber);

                    if (allgacha.isEmpty()) {
                        return "allgacha 정보를 찾을 수 없음";
                    } else {
                        Gacha gacha = new Gacha();
                        gacha.setAllgachaIdx(allgacha.get());
                        gacha.setUserIdx(user);
                        // 이미 뽑은걸 또 다시 뽑은 상태
                        if (exist.contains(gachaNumber)) {
                            gachaDto.setExistGacha(false);
                        // 새로운 가챠를 뽑은 상태
                        } else {
                            gachaDto.setExistGacha(true);
                            exist.add(allgacha.get().getAllgachaIdx());
                            gachaRepository.save(gacha);
                        }

                        // 리턴을 위한 저장
                        gachaDto.setGachaIdx(allgacha.get().getAllgachaIdx());
                        gachaDto.setGachaImg(allgacha.get().getAllgachaImg());
                        gachaDto.setGachaClass(allgacha.get().getAllgachaClass());

                        log.info("gachaDto ={}", gachaDto);
//                        gachaMap.put(i, gachaDto);
                        gachaList.add(gachaDto);
                    }
                }
//                return gachaMap;
                return gachaList;

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

                result.put("nGacha", nGacha);
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
