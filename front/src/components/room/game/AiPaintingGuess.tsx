import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

import tw from 'tailwind-styled-components';

import GameLeftSide from './sides/GameLeftSide';
import GameRightSide from './sides/GameRightSide';
import GameCenter from './sides/GameCenter';
import Margin, { MarginType } from '@/components/ui/Margin';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import AiWordsDialog from './dialogs/AiWordsDialog';
import EndRoundDialog from './dialogs/EndRoundDialog';
import { useAppDispatch, useAppSelector } from '@/store/thunkhook';
import { ChatType, addChat, endRound } from '@/store/slice/inGameSlice';

export default function AiPaintingGuess() {
  const { selectedKeyword, leftTime } = useAppSelector((state) => state.inGame);
  const dispatch = useAppDispatch();

  // 정답
  // 게임 정답 리스트
  const [answerList, setAnswerList] = useState<string[]>([]);
  // 정답 입력값
  const [answerInputValue, setAnswerInputValue] = useState('');
  // 정답 입력
  const answerChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setAnswerInputValue(event.target.value);
  };
  // 정답 제출
  const answerSubmitHandler: React.FormEventHandler = (event) => {
    event.preventDefault();
    const inputValue = answerInputValue;
    const chatInputValue: ChatType = {
      user: '아프리카청춘이다',
      status: 'answer',
      content: inputValue,
    };
    if (selectedKeyword === inputValue) {
      setAnswerList((prev) => [...prev, inputValue]);
    }
    dispatch(addChat(chatInputValue));
    setAnswerInputValue('');
  };

  useEffect(() => {
    if (selectedKeyword === answerList[0] || leftTime === 0) {
      dispatch(endRound());
      setAnswerList([]);
      return;
    }
  }, [answerList, selectedKeyword, leftTime, dispatch]);

  return (
    <>
      <AiWordsDialog />
      <EndRoundDialog />
      <GameLeftSide isPainting={false} />
      <GameCenter>
        <PaintingView>
          <ImageBox>
            <Image
              src={
                'https://img.freepik.com/free-photo/assorted-mixed-fruits_74190-6961.jpg?w=996&t=st=1683175100~exp=1683175700~hmac=7dbf59f1e64cbe127e46cf31a1890e413d83644d58d24fe0872d7c4f3f9f7943'
              }
              alt="AI 주제 이미지"
              fill
              sizes="100%"
              priority
            />
          </ImageBox>
          <ImageBox>
            <Image
              src={
                'https://img.freepik.com/free-photo/grapes-strawberries-pineapple-kiwi-apricot-banana-whole-pineapple_23-2147968680.jpg?w=900&t=st=1683175089~exp=1683175689~hmac=07298c43585c7067f7cac9a574653457c68f3749820cba9bf97b0659e4100d28'
              }
              alt="AI 주제 이미지"
              fill
              sizes="100%"
              priority
            />
          </ImageBox>
          <ImageBox>
            <Image
              src={
                'https://img.freepik.com/free-photo/mix-fruits_1339-413.jpg?w=996&t=st=1683175113~exp=1683175713~hmac=81d4f36c430e792d1fa48bcc89fbf496bfe77cef0aeca53b2dc0c44aa693d26d'
              }
              alt="AI 주제 이미지"
              fill
              sizes="100%"
              priority
            />
          </ImageBox>
          <ImageBox>
            <Image
              src={
                'https://img.freepik.com/free-photo/colorful-collage-fruits-texture-close-up_23-2149870295.jpg?w=1060&t=st=1683175124~exp=1683175724~hmac=9358b617e6eccb13c7a4ff28873a757a7fa165283770c100ffe4b87f150c576a'
              }
              alt="AI 주제 이미지"
              fill
              sizes="100%"
              priority
            />
          </ImageBox>
        </PaintingView>
        <Margin type={MarginType.height} size={16} />
        <AnswerForm onSubmit={answerSubmitHandler}>
          <AnswerInfo>
            <p>
              정답 :
              {answerList.map((answer, idx) => (
                <span key={idx}>
                  <Margin type={MarginType.width} size={4} />
                  <span>{answer}</span>
                </span>
              ))}
            </p>
            <p>{answerList.length} / 3</p>
          </AnswerInfo>
          <Margin type={MarginType.height} size={24} />
          <AnswerInputSection>
            <Input
              type="text"
              placeholder="그림에 해당하는 제시어를 입력해주세요."
              value={answerInputValue}
              onChange={answerChangeHandler}
            />
            <Margin type={MarginType.width} size={16} />
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

const ImageBox = tw.div`
  relative
`;
