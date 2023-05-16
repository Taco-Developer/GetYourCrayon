import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

import tw from 'tailwind-styled-components';

import GameLeftSide from './sides/GameLeftSide';
import GameRightSide from './sides/GameRightSide';
import GameCenter from './sides/GameCenter';
import EndRoundDialog from './dialogs/EndRoundDialog';
import Margin, { MarginType } from '@/components/ui/Margin';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

import { useAppDispatch, useAppSelector } from '@/store/thunkhook';
import {
  addAiImages,
  openIsScoreCheckModalOpened,
  savePrompt,
} from '@/store/slice/game/aiGameDatasSlice';
import {
  InGameChatDataType,
  addInGameChat,
} from '@/store/slice/game/inGameChatDatasSlice';
import { endGame } from '@/store/slice/game/isGameStartedSlice';
import { saveTheme } from '@/store/slice/game/gameThemeSlice';
import {
  addInputedAnswers,
  addSavedAnswers,
} from '@/store/slice/game/answersSlice';
import { listenEvent, removeEvent } from '@/socket/socketEvent';
import { sendMessage } from '@/socket/messageSend';
import { gameAPI } from '@/api/api';

export default function AiPaintingGuess({ socket }: { socket: WebSocket }) {
  const {
    leftTime,
    gameTheme,
    answers: { savedAnswers, inputedAnswers },
    aiGameDatas: { aiImages },
    roomIdx: { roomIdx },
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
    const chatInputValue: InGameChatDataType = {
      user: '아프리카청춘이다',
      status: 'answer',
      content: answer,
    };
    sendMessage(socket, 'chat', { ...chatInputValue });
    setAnswerInputValue('');
    if (
      savedAnswers.indexOf(answer) === -1 ||
      inputedAnswers.indexOf(answer) !== -1
    )
      return;
    dispatch(addInputedAnswers(answer));
  };

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

  // socket 통신
  useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data.type !== 'gameDto') return;
      dispatch(addAiImages(data.aiImages));
      dispatch(saveTheme(data.selectedTheme));
      dispatch(addSavedAnswers(data.answers));
      dispatch(savePrompt(data.prompt));
    };

    listenEvent(socket, messageHandler);

    return () => {
      removeEvent(socket, messageHandler);
    };
  }, [socket, dispatch]);

  useEffect(() => {
    const dummy = async () => {
      const response = await gameAPI.postGameStart(roomIdx!, 'AI', 4);
      console.log(response);
      const { correct, message, selectedUserIdx, theme, type, urlList } =
        await response.data;

      dispatch(addAiImages(urlList));
      dispatch(addSavedAnswers(correct));
      dispatch(saveTheme(theme));
      dispatch(savePrompt(message));
    };
    dummy();
  }, [roomIdx, dispatch]);

  // if (aiImages.length === 0) {
  //   return <div>AI가 이미지를 만들고 있어요ㅠㅠ</div>;
  // }

  return (
    <>
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
      <GameRightSide isPainting={false} socket={socket} />
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
