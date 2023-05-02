import React, { useEffect, useState } from 'react';

import tw from 'tailwind-styled-components';

import GameLeftSide from './sides/GameLeftSide';
import GameRightSide from './sides/GameRightSide';
import GameCenter from './sides/GameCenter';
import Margin from '@/components/ui/Margin';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import AiWordsDialog from './dialogs/AiWordsDialog';
import EndRoundDialog from './dialogs/EndRoundDialog';

export default function AiPaintingGuess() {
  const answerSubmitHandler: React.FormEventHandler = (event) => {
    event.preventDefault();
  };

  const [isWordOpened, setIsWordsModalOpened] = useState(false);
  const [isEndRoundOpened, setIsEndRoundOpened] = useState(false);

  useEffect(() => {
    setIsWordsModalOpened(true);
    const timer = setTimeout(() => {
      setIsEndRoundOpened(true);
    }, 3000);
  }, []);

  return (
    <>
      <AiWordsDialog
        isOpened={isWordOpened}
        onClose={() => {
          setIsWordsModalOpened(false);
        }}
      />
      <EndRoundDialog
        isOpened={isEndRoundOpened}
        onClose={() => {
          setIsEndRoundOpened(false);
        }}
      />
      <GameLeftSide isPainting={false} />
      <GameCenter>
        <PaintingView>
          <div className="bg-white">1</div>
          <div className="bg-white">2</div>
          <div className="bg-white">3</div>
          <div className="bg-white">4</div>
        </PaintingView>
        <Margin type="height" size={16} />
        <AnswerForm onSubmit={answerSubmitHandler}>
          <AnswerInfo>
            <p>정답 : 토끼</p>
            <p>1 / 6</p>
          </AnswerInfo>
          <Margin type="height" size={24} />
          <AnswerInputSection>
            <Input
              type="text"
              placeholder="그림에 해당하는 제시어를 입력해주세요."
            />
            <Margin type="width" size={16} />
            <Button px={4} py={2} rounded="lg" color="bg-blue-300">
              입력
            </Button>
          </AnswerInputSection>
        </AnswerForm>
      </GameCenter>
      <GameRightSide isPainting={false} />
    </>
  );
}

const PaintingView = tw.div`
  flex-auto

  w-full
  bg-[#88CDFF]

  p-2

  grid
  grid-rows-2
  grid-cols-2
  gap-2
`;

const AnswerForm = tw.form`
    w-full
    bg-white
    rounded-lg

    py-4
    px-8
`;

const AnswerInfo = tw.div`
    w-full

    flex
    justify-between
`;

const AnswerInputSection = tw.div`
    w-full

    flex
    justify-between
`;
