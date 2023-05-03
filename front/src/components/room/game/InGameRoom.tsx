import React, { useState } from 'react';

import tw from 'tailwind-styled-components';

import Lier from '@/components/room/game/Lier';
import ReverseCatchMind from '@/components/room/game/ReverseCatchMind';
import AiPaintingGuess from '@/components/room/game/AiPaintingGuess';
import RelayPainting from '@/components/room/game/RelayPainting';
import CatchMinde from '@/components/room/game/CatchMinde';

const INIT_SECOND = 5;
const INIT_USERS = [
  { id: 1, nickname: '아프리카청춘이다' },
  { id: 2, nickname: '벼랑위의당뇨' },
  { id: 3, nickname: '넌내게목욕값을줬어' },
  { id: 4, nickname: '돈들어손내놔' },
  { id: 5, nickname: '헬리콥터와마법사의똥' },
  { id: 6, nickname: '아무리생강캐도난마늘' },
];
const INIT_ROUND = { now: 1, total: 6 };

export interface ChatType {
  user: string;
  status: string;
  content: string;
}

export interface GameRoundType {
  now: number;
  total: number;
}

export interface GameUser {
  id: number;
  nickname: string;
}

export interface RoomEssentialDataType {
  gameRound: GameRoundType;
  userList: GameUser[];
  leftTime: number;
  chatList: ChatType[];
  nextRound: () => void;
  countDown: () => void;
  onChatInput: (chatInput: ChatType) => void;
  resetTime: () => void;
}

export default function InGameRoom() {
  // 라운드
  const [gameRound, setGameRound] = useState(INIT_ROUND);
  // 다음 라운드
  const nextRound = () => {
    setGameRound((prev) => {
      return { ...prev, now: prev.now + 1 };
    });
  };

  // 참가자 목록
  const [userList, setUserList] = useState(INIT_USERS);

  // 남은 시간
  const [leftTime, setLeftTime] = useState(INIT_SECOND);
  // 카운트다운
  const countDown = () => {
    setLeftTime((prev) => prev - 1);
  };
  // 타이머 초기화
  const resetTime = () => {
    setLeftTime(INIT_SECOND);
  };

  // 채팅
  const [chatList, setChatList] = useState<ChatType[]>([]);
  // 채팅 입력
  const onChatInput = (chatInput: ChatType) => {
    setChatList((prev) => [...prev, chatInput]);
  };

  return (
    <>
      <Container>
        {/* <Lier /> */}
        <AiPaintingGuess
          leftTime={leftTime}
          gameRound={gameRound}
          userList={userList}
          chatList={chatList}
          countDown={countDown}
          nextRound={nextRound}
          onChatInput={onChatInput}
          resetTime={resetTime}
        />
        {/* <RelayPainting /> */}
        {/* <ReverseCatchMind /> */}
        {/* <CatchMinde /> */}
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
