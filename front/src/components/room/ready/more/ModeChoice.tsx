import React, { useState } from 'react';
import tw from 'tailwind-styled-components';

export default function ModeChoice() {
  const [choiceMode, setChoiceMode] = useState<number>(0);
  const gameList: string[] = [
    'ai',
    '라이어',
    '캐치마인드',
    '리버스캐치마인드',
    '이어그리기',
  ];

  const pickMode = (i: number) => {
    setChoiceMode(i);
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

const OutDiv = tw.div`w-full h-70 m-3  flex flex-row items-center justify-between`;
const CardBtn = tw.div`h-full w-20 bg-white bg-opacity-50 rounded-2xl m-1 flex items-center justify-center`;
