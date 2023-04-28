import React, { ReactNode } from 'react';

import tw from 'tailwind-styled-components';

import GameLeftSide from '../sides/GameLeftSide';
import GameCenter from '../sides/GameCenter';
import GameRightSide from '../sides/GameRightSide';
import Margin from '@/components/ui/Margin';
import { Button } from '@/components/ui/Button';

export default function Selecting() {
  return (
    <>
      <GameLeftSide isPainting={false} />
      <GameCenter>
        <PaingView>메인</PaingView>
        <Margin type="height" size={16} />
        <PaintingInfo>
          <p>그린 사람 : 참가자1</p>
          <p>1/5</p>
        </PaintingInfo>
        <Margin type="height" size={16} />
        <Option>
          <div>
            <Button px={4} py={2} rounded="lg" color="bg-amber-300">
              라이어 선택
            </Button>
            <Margin type="width" size={8} />
            <span>1/6</span>
          </div>
          <div>
            <Button px={4} py={2} rounded="lg" color="bg-blue-400">
              라운드 추가
            </Button>
            <Margin type="width" size={8} />
            <span>1/6</span>
          </div>
        </Option>
      </GameCenter>
      <GameRightSide isPainting={false} />
    </>
  );
}

const PaingView = tw.div`
    flex-auto

    w-full
    bg-white
`;

const PaintingInfo = tw.div`
    w-full
    bg-white
    px-8
    py-4

    rounded-lg

    flex
    justify-between
`;

// const Button = tw.button<{ color: string }>`
//     px-4
//     py-2

//     rounded-lg

//     ${(props) => props.color}
// `;

const Option = tw.div`
    w-full
    bg-white
    px-8
    py-4

    rounded-lg

    flex
    justify-between
`;
