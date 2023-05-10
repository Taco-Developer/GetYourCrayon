import React, { ReactNode, useState } from 'react';

import tw from 'tailwind-styled-components';

import GameLeftSide from '../sides/GameLeftSide';
import GameCenter from '../sides/GameCenter';
import GameRightSide from '../sides/GameRightSide';
import Margin, { MarginType } from '@/components/ui/Margin';
import { Button } from '@/components/ui/Button';
import LierSelectDialog from '../dialogs/LierSelectDialog';

export default function Selecting() {
  const [isSelectDialogOpened, setIsSelectDialogOpened] =
    useState<boolean>(false);

  const openSelectDialog = () => {
    setIsSelectDialogOpened(true);
  };

  const closeSelectDialog = () => {
    setIsSelectDialogOpened(false);
  };

  return (
    <>
      <LierSelectDialog
        isOpened={isSelectDialogOpened}
        onDialogClose={() => {
          closeSelectDialog();
        }}
      />
      <GameLeftSide isPainting={false} />
      <GameCenter>
        <PaingView>메인</PaingView>
        <Margin type={MarginType.height} size={16} />
        <PaintingInfo>
          <p>그린 사람 : 참가자1</p>
          <p>1/5</p>
        </PaintingInfo>
        <Margin type={MarginType.height} size={16} />
        <Option>
          <div>
            <Button
              px={4}
              py={2}
              rounded="lg"
              color="bg-amber-300"
              onClick={openSelectDialog}
            >
              라이어 선택
            </Button>
            <Margin type={MarginType.width} size={8} />
            <span>1/6</span>
          </div>
          <div>
            <Button px={4} py={2} rounded="lg" color="bg-blue-400">
              라운드 추가
            </Button>
            <Margin type={MarginType.width} size={8} />
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
