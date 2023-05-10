import React from 'react';

import tw from 'tailwind-styled-components';

import GameLeftSide from '../sides/GameLeftSide';
import GameRightSide from '../sides/GameRightSide';
import GameCenter from '../sides/GameCenter';
import Margin, { MarginType } from '@/components/ui/Margin';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function Solving({ isReverseGame }: { isReverseGame: boolean }) {
  const submitHandler: React.FormEventHandler = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <GameLeftSide isPainting={false} />
      {isReverseGame && (
        <GameCenter>
          <PaintingView />
          <Margin type={MarginType.height} size={16} />
          <AnswerForm onSubmit={submitHandler}>
            <Input
              type="text"
              placeholder="그림에 해당하는 제시어를 입력해주세요."
            />
            <Margin type={MarginType.width} size={16} />
            <Button px={4} py={2} rounded="lg" color="bg-blue-300">
              입력
            </Button>
          </AnswerForm>
        </GameCenter>
      )}
      {!isReverseGame && (
        <GameCenter>
          <PaintingInfo>
            <p>현재 참가자5님이 그리는 중입니다.</p>
          </PaintingInfo>
          <Margin type={MarginType.height} size={16} />
          <PaintingView />
          <Margin type={MarginType.height} size={16} />
          <AnswerForm onSubmit={submitHandler}>
            <Input
              type="text"
              placeholder="그림에 해당하는 제시어를 입력해주세요."
            />
            <Margin type={MarginType.width} size={16} />
            <Button px={4} py={2} rounded="lg" color="bg-blue-300">
              입력
            </Button>
          </AnswerForm>
        </GameCenter>
      )}
      <GameRightSide isPainting={false} />
    </>
  );
}

const PaintingView = tw.div`
    w-full
    bg-white

    flex-auto
`;

const AnswerForm = tw.form`
    w-full
    bg-white

    rounded-lg

    py-4
    px-8

    flex
    items-center
`;

const PaintingInfo = tw.div`
  w-full

  rounded-lg

  py-2
  px-8
  
  bg-white
`;
