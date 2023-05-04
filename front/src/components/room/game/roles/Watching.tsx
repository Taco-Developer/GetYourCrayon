import React from 'react';

import tw from 'tailwind-styled-components';

import GameLeftSide from '../sides/GameLeftSide';
import GameRightSide from '../sides/GameRightSide';
import GameCenter from '../sides/GameCenter';
import Margin from '@/components/ui/Margin';

export default function Watching() {
  return (
    <>
      <GameLeftSide isPainting={false} />
      <GameCenter>
        <NoticePerson>그리는 사람</NoticePerson>
        <Margin type="height" size={32} />
        <Canvas>그림 그리는 화면</Canvas>
      </GameCenter>
      <GameRightSide isPainting={false} />
    </>
  );
}

const NoticePerson = tw.div`
  w-full
  bg-white
  p-6

  rounded-lg

`;

const Canvas = tw.div`
  flex-auto

  w-full
  bg-white

  flex
  justify-center
  items-center
`;