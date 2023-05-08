import React, { useEffect, useState, useCallback } from 'react';

import tw from 'tailwind-styled-components';

import GameLeftSide from './sides/GameLeftSide';
import GameRightSide from './sides/GameRightSide';
import GameCenter from './sides/GameCenter';
import Margin from '@/components/ui/Margin';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import AiWordsDialog from './dialogs/AiWordsDialog';
import EndRoundDialog from './dialogs/EndRoundDialog';
import { RoomEssentialDataType, ChatType } from './InGameRoom';
import Image from 'next/image';

export default function AiPaintingGuess({
  leftTime,
  chatList,
  gameRound,
  userList,
  score,
  changeScoreHandler,
  countDown,
  nextRound,
  onChatInput,
  resetTime,
}: RoomEssentialDataType) {
  // 모달 상태
  const [isWordOpened, setIsWordsModalOpened] = useState(true);
  const [isEndRoundOpened, setIsEndRoundOpened] = useState(false);

  // 주제
  const [category, setCategory] = useState('');
  const changeCategory = useCallback((category: string) => {
    setCategory(category);
  }, []);

  // 키워드
  const [selectedKeyword, setSelectedKeyword] = useState<string>('');
  const onKeywordSelectHandler = (clickedKeyword: string) => {
    setSelectedKeyword((prev) => {
      if (prev === clickedKeyword) return '';
      return clickedKeyword;
    });
  };

  // 정답
  // 게임 정답 리스트
  const [answerList, setAnswerList] = useState<string[]>([]);
  // 정답 입력값
  const [answerInputValue, setAnswerInputValue] = useState('');
  // 정답 입력
  const answerChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setAnswerInputValue(event.target.value);
  };
  // 정답 제출
  const answerSubmitHandler: React.FormEventHandler = (event) => {
    event.preventDefault();
    const inputValue = answerInputValue;
    const chatInputValue: ChatType = {
      user: '아프리카청춘이다',
      status: 'answer',
      content: inputValue,
    };
    if (selectedKeyword === inputValue) {
      setAnswerList((prev) => [...prev, inputValue]);
    }
    onChatInput(chatInputValue);
    setAnswerInputValue('');
  };

  // 게임 진행 상태
  const [isGameStarted, setIsGameStarted] = useState(false);

  // 라운드 종료
  const endRound = useCallback(() => {
    if (leftTime > 0) {
      changeScoreHandler(20);
    } else {
      changeScoreHandler(0);
    }
    // 라운드 종료 모달 오픈
    setIsEndRoundOpened(true);
    // 게임 진행 상태 초기화
    setIsGameStarted(false);
    // 선택 키워드 리셋
    setSelectedKeyword('');
    // 정답 리스트 리셋
  }, [
    leftTime,
    setIsEndRoundOpened,
    setIsGameStarted,
    setSelectedKeyword,
    changeScoreHandler,
  ]);

  // 시간 초과 => 라운드 종료
  useEffect(() => {
    if (leftTime === 0) {
      endRound();
    }
  }, [leftTime, endRound]);

  // 모든 정답 입력 => 라운드 종료
  useEffect(() => {
    if (answerList.length === 0) return;
    if (answerList.every((answer) => answer === selectedKeyword)) {
      endRound();
    }
  }, [answerList, selectedKeyword, endRound]);

  return (
    <>
      <AiWordsDialog
        isOpened={isWordOpened}
        selectedKeyword={selectedKeyword}
        category={category}
        changeCategory={changeCategory}
        onKeywordSelectHandler={onKeywordSelectHandler}
        onClose={() => {
          if (selectedKeyword === '') return;
          setIsWordsModalOpened(false);
          setIsGameStarted(true);
          setAnswerList([]);
        }}
      />
      <EndRoundDialog
        isOpened={isEndRoundOpened}
        totalScore={score}
        roundScore={leftTime > 0 ? 20 : 0}
        onClose={() => {
          setIsEndRoundOpened(false);
          if (gameRound.now === gameRound.total) return;
          setIsWordsModalOpened(true);
          nextRound();
          resetTime();
        }}
      />
      <GameLeftSide
        isPainting={false}
        userList={userList}
        gameRound={gameRound}
      />
      <GameCenter>
        <PaintingView>
          <ImageBox>
            <Image
              src={
                'https://img.freepik.com/free-photo/assorted-mixed-fruits_74190-6961.jpg?w=996&t=st=1683175100~exp=1683175700~hmac=7dbf59f1e64cbe127e46cf31a1890e413d83644d58d24fe0872d7c4f3f9f7943'
              }
              alt="AI 주제 이미지지"
              fill
              sizes="100%"
            />
          </ImageBox>
          <ImageBox>
            <Image
              src={
                'https://img.freepik.com/free-photo/grapes-strawberries-pineapple-kiwi-apricot-banana-whole-pineapple_23-2147968680.jpg?w=900&t=st=1683175089~exp=1683175689~hmac=07298c43585c7067f7cac9a574653457c68f3749820cba9bf97b0659e4100d28'
              }
              alt="AI 주제 이미지지"
              fill
              sizes="100%"
            />
          </ImageBox>
          <ImageBox>
            <Image
              src={
                'https://img.freepik.com/free-photo/mix-fruits_1339-413.jpg?w=996&t=st=1683175113~exp=1683175713~hmac=81d4f36c430e792d1fa48bcc89fbf496bfe77cef0aeca53b2dc0c44aa693d26d'
              }
              alt="AI 주제 이미지지"
              fill
              sizes="100%"
            />
          </ImageBox>
          <ImageBox>
            <Image
              src={
                'https://img.freepik.com/free-photo/colorful-collage-fruits-texture-close-up_23-2149870295.jpg?w=1060&t=st=1683175124~exp=1683175724~hmac=9358b617e6eccb13c7a4ff28873a757a7fa165283770c100ffe4b87f150c576a'
              }
              alt="AI 주제 이미지지"
              fill
              sizes="100%"
            />
          </ImageBox>
        </PaintingView>
        <Margin type="height" size={16} />
        <AnswerForm onSubmit={answerSubmitHandler}>
          <AnswerInfo>
            <p>
              정답 :
              {answerList.map((answer, idx) => (
                <span key={idx}>
                  <Margin type="width" size={4} />
                  <span>{answer}</span>
                </span>
              ))}
            </p>
            <p>{answerList.length} / 3</p>
          </AnswerInfo>
          <Margin type="height" size={24} />
          <AnswerInputSection>
            <Input
              type="text"
              placeholder="그림에 해당하는 제시어를 입력해주세요."
              value={answerInputValue}
              onChange={answerChangeHandler}
            />
            <Margin type="width" size={16} />
            <Button px={4} py={2} rounded="lg" color="bg-blue-300">
              입력
            </Button>
          </AnswerInputSection>
        </AnswerForm>
      </GameCenter>
      <GameRightSide
        isPainting={false}
        isGameStarted={isGameStarted}
        countDown={countDown}
        leftTime={leftTime}
        chatList={chatList}
        onChatInput={onChatInput}
      />
    </>
  );
}

const PaintingView = tw.div`
  flex-auto

  w-full
  bg-[#88CDFF]

  p-2

  grid
  grid-rows-2
  grid-cols-2
  gap-2
`;

const AnswerForm = tw.form`
    w-full
    bg-white
    rounded-lg

    py-4
    px-8
`;

const AnswerInfo = tw.div`
    w-full

    flex
    justify-between
`;

const AnswerInputSection = tw.div`
    w-full

    flex
    justify-between
`;

const ImageBox = tw.div`
  relative
`;
