import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { getCookie } from 'cookies-next';

import tw from 'tailwind-styled-components';

import GameLeftSide from './sides/GameLeftSide';
import GameRightSide from './sides/GameRightSide';
import GameCenter from './sides/GameCenter';
import EndRoundDialog from './dialogs/EndRoundDialog';
import Margin, { MarginType } from '@/components/ui/Margin';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

import { useAppDispatch, useAppSelector } from '@/store/thunkhook';
import { addAiImages, savePrompt } from '@/store/slice/game/gameDatasSlice';
import { InGameChatDataType } from '@/store/slice/game/inGameChatDatasSlice';
import { saveTheme } from '@/store/slice/game/gameThemeSlice';
import { addSavedAnswers } from '@/store/slice/game/answersSlice';
import { listenEvent, removeEvent } from '@/socket/socketEvent';
import { sendMessage } from '@/socket/messageSend';
import { endRound, startRound } from '@/store/slice/game/gameRoundSlice';
import Loading from '@/components/ui/Loading';
import { setDefaultScore, setWinnerScore } from '@/store/slice/game/score';
import { setGameUsers } from '@/store/slice/game/gameUsersSlice';

export default function AiPaintingGuess({ socket }: { socket: WebSocket }) {
  const {
    leftTime,
    gameRound: { now },
    answers: { savedAnswers, inputedAnswers },
    gameDatas: { aiImages },
    userInfo: { userIdx, userNickname },
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
      user: userNickname,
      status: 'answer',
      content: answer,
      userIdx,
    };
    sendMessage(socket, 'chat', chatInputValue);
    setAnswerInputValue('');
  };

  // 정답 비교
  useEffect(() => {
    if (
      (savedAnswers.length > 0 &&
        savedAnswers.length === inputedAnswers.length) ||
      leftTime === 0
    ) {
      dispatch(endRound());
      sendMessage(socket, 'roundOver');
    }
  }, [savedAnswers, inputedAnswers, leftTime, dispatch, socket]);

  // socket 통신
  useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data.type !== 'gameDto') return;
      console.log(data);
      const {
        correct,
        message,
        theme,
        urlList,
        winnerScore,
        defualtScore,
        userList,
      } = data;
      dispatch(setWinnerScore(winnerScore));
      dispatch(setDefaultScore(defualtScore));
      dispatch(addAiImages(urlList));
      dispatch(setGameUsers(userList));
      dispatch(addSavedAnswers(correct));
      dispatch(saveTheme(theme));
      dispatch(savePrompt(message));
      dispatch(startRound());
      sendMessage(socket, 'timeStart');
    };

    listenEvent(socket, messageHandler);

    return () => {
      removeEvent(socket, messageHandler);
    };
  }, [socket, dispatch]);

  // 시작
  useEffect(() => {
    if (now === 1) {
      console.log('최초');
      sendMessage(socket, 'gameStart', {
        authorization: getCookie('accesstoken'),
      });
    } else {
      console.log('다음');
      sendMessage(socket, 'nextRound', {
        authorization: getCookie('accesstoken'),
      });
    }
  }, [socket, now]);

  if (aiImages.length === 0) {
    return <Loading />;
  }

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
