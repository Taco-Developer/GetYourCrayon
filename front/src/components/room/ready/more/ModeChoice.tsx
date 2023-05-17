import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
import { useAppSelector } from '@/store/thunkhook';

export default function ModeChoice() {
  const { roomInfo, userInfo } = useAppSelector((state) => state);
  const [btnAdmin, setBtnAdmin] = useState<boolean>(true);

  const [choiceMode, setChoiceMode] = useState<number>(0);
  const gameList: string[] = [
    'AI',
    '라이어',
    '캐치마인드',
    '리버스캐치마인드',
    '이어그리기',
  ];

  const pickMode = (i: number) => {
    if (userInfo.userIdx === roomInfo.adminUserIdx) {
      setChoiceMode(i);
    }
  };

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
