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
import { RoomEssentialDataType, ChatType } from './InGameRoom';

export default function AiPaintingGuess({
  leftTime,
  chatList,
  gameRound,
  userList,
  countDown,
  nextRound,
  onChatInput,
  resetTime,
}: RoomEssentialDataType) {
  // 모달 상태
  const [isWordOpened, setIsWordsModalOpened] = useState(true);
  const [isEndRoundOpened, setIsEndRoundOpened] = useState(false);

  // 키워드
  const [keywordList, setKeywordList] = useState<string[]>([]);
  const addKeyword = (keyword: string) => {
    setKeywordList((prev) => {
      if (prev.length >= 3) return prev;
      return [...prev, keyword];
    });
  };
  const deleteKeyword = (keyword: string) => {
    setKeywordList((prev) => {
      const idx = prev.indexOf(keyword);
      prev.splice(idx, 1);
      return prev;
    });
  };

  // 정답
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
    onChatInput(chatInputValue);
    setAnswerInputValue('');
  };

  // 게임 진행 상태
  const [isGameStarted, setIsGameStarted] = useState(false);

  useEffect(() => {
    if (leftTime === 0) {
      setIsEndRoundOpened(true);
      setIsGameStarted(false);
    }
  }, [leftTime]);

  return (
    <>
      <AiWordsDialog
        isOpened={isWordOpened}
        keywordList={keywordList}
        addKeyword={addKeyword}
        deleteKeyword={deleteKeyword}
        onClose={() => {
          if (keywordList.length < 3) return;
          setIsWordsModalOpened(false);
          setIsGameStarted(true);
        }}
      />
      <EndRoundDialog
        isOpened={isEndRoundOpened}
        onClose={() => {
          setIsEndRoundOpened(false);
          if (gameRound.now === gameRound.total) return;
          setIsWordsModalOpened(true);
          nextRound();
          resetTime();
        }}
      />
      <GameLeftSide
        isPainting={false}
        userList={userList}
        gameRound={gameRound}
      />
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
              value={answerInputValue}
              onChange={answerChangeHandler}
            />
            <Margin type="width" size={16} />
            <Button px={4} py={2} rounded="lg" color="bg-blue-300">
              입력
            </Button>
          </AnswerInputSection>
        </AnswerForm>
      </GameCenter>
      <GameRightSide
        isPainting={false}
        isGameStarted={isGameStarted}
        countDown={countDown}
        leftTime={leftTime}
        chatList={chatList}
        onChatInput={onChatInput}
      />
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
