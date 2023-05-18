import React, { useEffect } from 'react';

import tw from 'tailwind-styled-components';

import Lier from '@/components/room/game/Lier';
import ReverseCatchMind from '@/components/room/game/ReverseCatchMind';
import AiPaintingGuess from '@/components/room/game/AiPaintingGuess';
import RelayPainting from '@/components/room/game/RelayPainting';
import CatchMind from '@/components/room/game/CatchMind';
import { useAppDispatch, useAppSelector } from '@/store/thunkhook';
import { addInGameChat } from '@/store/slice/game/inGameChatDatasSlice';
import { listenEvent, removeEvent } from '@/socket/socketEvent';
import { changeTime } from '@/store/slice/game/leftTimeSlice';
import {
  addInputedAnswers,
  addSavedAnswers,
} from '@/store/slice/game/answersSlice';
import {
  setTotalRound,
  setWinner,
  startRound,
} from '@/store/slice/game/gameRoundSlice';
import { setGameUsers } from '@/store/slice/game/gameUsersSlice';
import {
  openIsScoreCheckModalOpened,
  setImageAndPrompt,
  setSelectedUserIdx,
} from '@/store/slice/game/gameDatasSlice';
import { setAllScore } from '@/store/slice/game/score';
import { saveTheme } from '@/store/slice/game/gameThemeSlice';
import { sendMessage } from '@/socket/messageSend';
import { getCookie } from 'cookies-next';

export default function InGameRoom({
  game,
  socket,
}: {
  game: string;
  socket: WebSocket;
}) {
  const {
    answers: { savedAnswers, inputedAnswers },
    roomInfo: { maxRound, adminUserIdx },
    userInfo: { userIdx },
    gameRound: { now },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setTotalRound(maxRound));
  }, [dispatch, maxRound]);

  useEffect(() => {
    const messageHandler = (message: MessageEvent) => {
      const data = JSON.parse(message.data);
      console.log(data);
      // 채팅
      if (data.type === 'chat') {
        const { content, status, user, userIdx } = data;
        dispatch(addInGameChat({ content, status, user, userIdx }));

        // 정답 입력 처리
        if (
          status === 'answer' &&
          savedAnswers.indexOf(content) !== -1 &&
          inputedAnswers.indexOf(content) === -1
        ) {
          dispatch(addInputedAnswers(content));
        }
        return;
      }

      // 시간
      if (data.type === 'timeStart') {
        const { message } = data;
        dispatch(changeTime(message));
        return;
      }

      // 라운드 종료
      if (data.type === 'roundOver') {
        const { winnerUserIdx, userList } = data;
        console.log(data);
        console.log('userList: ', userList, 'winnerIdx: ', winnerUserIdx);
        dispatch(setWinner(winnerUserIdx));
        dispatch(setGameUsers(userList));
        dispatch(openIsScoreCheckModalOpened());
        return;
      }

      // 게임 시작하면 받는 정보
      if (data.type === 'gameDto') {
        const {
          correct,
          message,
          theme,
          urlList,
          winnerScore,
          defualtScore,
          userList,
          selectedUserIdx,
        } = data;
        console.log(data);
        dispatch(setAllScore([defualtScore, winnerScore]));
        dispatch(
          setImageAndPrompt({ images: urlList as string[], prompt: message }),
        );
        dispatch(setSelectedUserIdx(selectedUserIdx));
        dispatch(setGameUsers(userList));
        dispatch(addSavedAnswers(correct));
        dispatch(saveTheme(theme));
        dispatch(startRound());
        if (userIdx === adminUserIdx) sendMessage(socket, 'timeStart');
        return;
      }
    };

    // 등록
    listenEvent(socket, messageHandler);

    // 해제
    return () => {
      removeEvent(socket, messageHandler);
    };
  }, [dispatch, socket, inputedAnswers, savedAnswers, userIdx, adminUserIdx]);

  // 시작
  useEffect(() => {
    if (userIdx !== adminUserIdx) return;
    const accesstoken = getCookie('accesstoken');
    let type;
    if (now === 1) {
      console.log('시작');
      type = 'gameStart';
    } else {
      console.log('다음');
      type = 'nextRound';
    }
    sendMessage(socket, type, {
      authorization: accesstoken,
    });
  }, [socket, now, userIdx, adminUserIdx]);

  return (
    <>
      <Container>
        {game === 'Lier' && <Lier socket={socket} />}
        {game === 'AiPainting' && <AiPaintingGuess socket={socket} />}
        {game === 'RelayPainting' && <RelayPainting socket={socket} />}
        {game === 'ReverseCatchMind' && <ReverseCatchMind socket={socket} />}
        {game === 'CatchMind' && <CatchMind socket={socket} />}
      </Container>
    </>
  );
}

const Container = tw.div`
  w-screen
  xl:w-10/12

  h-screen

  grid
  grid-cols-12
  gap-4

  mx-auto
  p-8

  bg-white/[.4]
`;
