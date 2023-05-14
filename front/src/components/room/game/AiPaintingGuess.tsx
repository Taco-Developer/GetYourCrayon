import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

import { w3cwebsocket as W3CWebsocket } from 'websocket';

import tw from 'tailwind-styled-components';

import GameLeftSide from './sides/GameLeftSide';
import GameRightSide from './sides/GameRightSide';
import GameCenter from './sides/GameCenter';
import Margin, { MarginType } from '@/components/ui/Margin';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import AiWordsDialog from './dialogs/AiWordsDialog';
import EndRoundDialog from './dialogs/EndRoundDialog';

import { useAppDispatch, useAppSelector } from '@/store/thunkhook';
import {
  addAiImages,
  openIsScoreCheckModalOpened,
  openIsSelectThemeModalOpened,
} from '@/store/slice/game/aiGameDatasSlice';
import { ChatType, addChat } from '@/store/slice/game/chatDatasSlice';
import { endGame } from '@/store/slice/game/isGameStartedSlice';
import { saveTheme } from '@/store/slice/game/gameThemeSlice';
import {
  addInputedAnswers,
  addSavedAnswers,
} from '@/store/slice/game/answersSlice';

const INIT_AI_IMAGES = [
  'https://img.freepik.com/free-photo/assorted-mixed-fruits_74190-6961.jpg?w=996&t=st=1683175100~exp=1683175700~hmac=7dbf59f1e64cbe127e46cf31a1890e413d83644d58d24fe0872d7c4f3f9f7943',
  'https://img.freepik.com/free-photo/grapes-strawberries-pineapple-kiwi-apricot-banana-whole-pineapple_23-2147968680.jpg?w=900&t=st=1683175089~exp=1683175689~hmac=07298c43585c7067f7cac9a574653457c68f3749820cba9bf97b0659e4100d28',
  'https://img.freepik.com/free-photo/colorful-collage-fruits-texture-close-up_23-2149870295.jpg?w=1060&t=st=1683175124~exp=1683175724~hmac=9358b617e6eccb13c7a4ff28873a757a7fa165283770c100ffe4b87f150c576a',
  'https://img.freepik.com/free-photo/mix-fruits_1339-413.jpg?w=996&t=st=1683175113~exp=1683175713~hmac=81d4f36c430e792d1fa48bcc89fbf496bfe77cef0aeca53b2dc0c44aa693d26d',
];

export default function AiPaintingGuess({ client }: { client: W3CWebsocket }) {
  const {
    leftTime,
    gameTheme,
    answers: { savedAnswers, inputedAnswers },
    aiGameDatas: { aiImages },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  // 정답 input 값
  const [answerInputValue, setAnswerInputValue] = useState('');
  // 정답 입력 변화
  const answerInputChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setAnswerInputValue(event.target.value);
  };
  // 정답 제출
  const answerSubmitHandler: React.FormEventHandler = (event) => {
    event.preventDefault();
    const answer = answerInputValue;
    const chatInputValue: ChatType = {
      user: '아프리카청춘이다',
      status: 'answer',
      content: answer,
    };
    dispatch(addChat(chatInputValue));
    setAnswerInputValue('');
    if (
      savedAnswers.indexOf(answer) === -1 ||
      inputedAnswers.indexOf(answer) !== -1
    )
      return;
    dispatch(addInputedAnswers(answer));
  };

  // 처음 테마 선택 모달 열기
  useEffect(() => {
    dispatch(openIsSelectThemeModalOpened());
  }, [dispatch]);

  // 이미지 불러오기 - 더미
  useEffect(() => {
    if (aiImages.length === 0) {
      dispatch(addAiImages(INIT_AI_IMAGES));
    }
  }, [aiImages, dispatch]);

  // 정답 불러오기 - 더미
  useEffect(() => {
    if (savedAnswers.length === 0) {
      dispatch(addSavedAnswers(['사과', '바나나', '배']));
    }
  }, [savedAnswers, dispatch]);

  // 정답 비교
  useEffect(() => {
    if (
      (savedAnswers.length > 0 &&
        savedAnswers.length === inputedAnswers.length) ||
      leftTime === 0
    ) {
      dispatch(endGame());
      dispatch(openIsScoreCheckModalOpened());
    }
  }, [savedAnswers, inputedAnswers, leftTime, dispatch]);

  // socket 통신 => 사용할 때 주석 풀기
  useEffect(() => {
    client.onmessage = (message) => {
      if (typeof message.data !== 'string') return;
      const data = JSON.parse(message.data);
      // 게임에 필요한 데이터 받기(aiImages, theme)
      if (data.type === 'problem') {
        dispatch(addAiImages(data.aiImages));
        dispatch(saveTheme(data.selectedTheme));
      }
    };
  }, [client, dispatch]);

  return (
    <>
      <AiWordsDialog />
      <EndRoundDialog />
      <GameLeftSide isPainting={false} />
      <GameCenter>
        <PaintingView>
          {aiImages.map((image) => (
            <ImageBox key={image}>
              <Image src={image} alt="AI 이미지" fill sizes="100%" priority />
            </ImageBox>
          ))}
        </PaintingView>
        <Margin type={MarginType.height} size={16} />
        <AnswerForm onSubmit={answerSubmitHandler}>
          <AnswerInfo>
            <p>
              정답 :
              {inputedAnswers.map((answer, idx) => (
                <span key={idx}>
                  <Margin type={MarginType.width} size={4} />
                  <span>{answer}</span>
                </span>
              ))}
            </p>
            <p>
              {inputedAnswers.length} / {savedAnswers.length}
            </p>
          </AnswerInfo>
          <Margin type={MarginType.height} size={24} />
          <AnswerInputSection>
            <Input
              type="text"
              placeholder="그림에 해당하는 제시어를 입력해주세요."
              value={answerInputValue}
              onChange={answerInputChangeHandler}
            />
            <Margin type={MarginType.width} size={16} />
            <Button px={4} py={2} rounded="lg" color="bg-blue-300">
              입력
            </Button>
          </AnswerInputSection>
        </AnswerForm>
      </GameCenter>
      <GameRightSide isPainting={false} />
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
