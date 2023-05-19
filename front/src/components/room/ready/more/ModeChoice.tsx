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
  const gameList: string[] = ['AI', '캐치마인드'];
  const socketSend: string[] = [
    'AiPainting',
    'CatchMind',
    'Lier',
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
    } else if (roomInfo.gameCategory === 'CatchMind') {
      setChoiceMode(1);
    } else if (roomInfo.gameCategory === 'Lier') {
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
        let t: string = '';
        if (i === 0 && choiceMode === i) {
          w = 'bg-AI-mode bg-cover w-40 w-60';
          t = 'bg-white bg-opacity-60 text-7xl';
        } else if (i === 1 && choiceMode === i) {
          w = 'bg-CatchMind bg-cover w-60';
          t = 'bg-white bg-opacity-60 text-7xl';
        } else if (choiceMode === i) {
          w = 'w-60 text-4xl';
        }
        return (
          <CardPick
            key={i}
            className={w}
            onClick={() => {
              pickMode(i);
            }}
          >
            <TextPick className={t}>{gameMode}</TextPick>
          </CardPick>
        );
      })}
    </OutDiv>
  );
}

const OutDiv = tw.div`w-full h-60 m-3  flex flex-row items-center justify-between`;
const CardPick = tw.div`w-40 h-full bg-white bg-opacity-50 text-5xl rounded-2xl m-1 flex items-center justify-center`;
const TextPick = tw.div``;
