import React, { useEffect, useRef, useState } from 'react';

import tw from 'tailwind-styled-components';

import SideDisplay from './SideDisplay';
import { Button } from '@/components/ui/Button';
import Margin, { MarginType } from '@/components/ui/Margin';

import { useAppDispatch, useAppSelector } from '@/store/thunkhook';
import {
  InGameChatDataType,
  addInGameChat,
} from '@/store/slice/game/inGameChatDatasSlice';
import { countDown } from '@/store/slice/game/leftTimeSlice';

interface GameRightSidePropsType {
  isPainting: boolean;
}

export default function GameRightSide({ isPainting }: GameRightSidePropsType) {
  const { leftTime, inGameChatDatas, isGameStarted } = useAppSelector(
    (state) => state,
  );
  const dispatch = useAppDispatch();

  // 채팅 입력값
  const [inputValue, setInputValue] = useState<string>('');
  // 채팅 입력
  const onChattingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  // 채팅 전송
  const chatSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const chat = inputValue.trim();
    if (!chat) return;
    const chatInput: InGameChatDataType = {
      user: '아프리카청춘이다',
      status: 'chatting',
      content: chat,
    };
    dispatch(addInGameChat(chatInput));
    setInputValue('');
  };

  // 타이머 관련 상태
  const [timerId, setTimerId] = useState<NodeJS.Timer>();
  // 카운트 종료
  if (leftTime <= 0) {
    clearInterval(timerId);
  }

  useEffect(() => {
    if (!isGameStarted) return;
    // 카운트 다운
    const timer = setInterval(() => {
      dispatch(countDown());
    }, 1000);
    setTimerId(timer);

    return () => {
      clearInterval(timer);
    };
  }, [isGameStarted, dispatch]);

  return (
    <SideDisplay isLeft={false}>
      <div className="bg-white p-4 rounded-full">{leftTime}s</div>
      <Margin type={MarginType.height} size={16} />
      <InGameChat>
        채팅
        <ChatView>
          {inGameChatDatas.map(({ content, status, user }, idx) => (
            <li
              key={idx}
              className={status === 'answer' ? 'bg-amber-300' : ''}
            >{`${user} : ${content}`}</li>
          ))}
        </ChatView>
        <ChatForm onSubmit={chatSubmitHandler}>
          <input
            type="text"
            name=""
            id=""
            className="w-full bg-transparent flex-auto px-2 outline-none"
            placeholder="채팅을 입력하세요"
            value={inputValue}
            onChange={onChattingChange}
          />
          <Button px={2} py={2} rounded="lg" color="bg-amber-300" className="">
            입력
          </Button>
        </ChatForm>
      </InGameChat>
      {isPainting && (
        <>
          <Margin type={MarginType.height} size={16} />
          <Button
            px={4}
            py={2}
            rounded="lg"
            color="bg-amber-300"
            className="w-full"
          >
            완료
          </Button>
        </>
      )}
    </SideDisplay>
  );
}

const InGameChat = tw.div`
  w-full
  h-full

  bg-[#88CDFF]
  rounded-lg

  p-4

  flex
  flex-col
  items-center
  gap-4

  overflow-hidden
`;

const ChatView = tw.ul`
  flex-auto

  w-full

  bg-white
  rounded-lg

  p-4

  overflow-y-auto
`;

const ChatForm = tw.form`
  w-full

  bg-white
  rounded-lg

  text-sm

  flex
  justify-between
  gap-2
`;
