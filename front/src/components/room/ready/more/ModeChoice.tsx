import React, { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import { useAppSelector } from '@/store/thunkhook';
import { sendMessage } from '@/socket/messageSend';

interface ReadyProps {
  socket: WebSocket | null;
}

export default function ModeChoice({ socket }: ReadyProps) {
  const { roomInfo, userInfo } = useAppSelector((state) => state);

  const [choiceMode, setChoiceMode] = useState<number>();
  const gameList: string[] = [
    'AI',
    '라이어',
    '캐치마인드',
    '리버스캐치마인드',
    '이어그리기',
  ];
  const socketSend: string[] = [
    'AiPainting',
    'Lier',
    'CatchMind',
    'ReverseCatchMind',
    'RelayPainting',
  ];

  const pickMode = (i: number) => {
    if (socket !== null && userInfo.userIdx === roomInfo.adminUserIdx) {
      setChoiceMode(i);
      const sendMode = socketSend[i];
      sendMessage(socket, 'gameMode', { gameMode: sendMode });
    }
  };

  useEffect(() => {
    if (roomInfo.gameCategory === 'AiPainting') {
      setChoiceMode(0);
    } else if (roomInfo.gameCategory === 'Lier') {
      setChoiceMode(1);
    } else if (roomInfo.gameCategory === 'CatchMind') {
      setChoiceMode(2);
    } else if (roomInfo.gameCategory === 'ReverseCatchMind') {
      setChoiceMode(3);
    } else if (roomInfo.gameCategory === 'RelayPainting') {
      setChoiceMode(4);
    }
  }, [roomInfo]);

  return (
    <OutDiv>
      {gameList.map((gameMode: string, i: number) => {
        let w: string = '';
        if (choiceMode === i) {
          w = 'w-40';
        }
        return (
          <CardBtn
            key={i}
            className={w}
            onClick={() => {
              pickMode(i);
            }}
          >
            {gameMode}
          </CardBtn>
        );
      })}
    </OutDiv>
  );
}

const OutDiv = tw.div`w-full h-60 m-3  flex flex-row items-center justify-between`;
const CardBtn = tw.div`w-20 h-full bg-white bg-opacity-50 rounded-2xl m-1 flex items-center justify-center`;
