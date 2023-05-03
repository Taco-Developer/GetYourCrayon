import React, { useEffect, useRef, useState } from 'react';

import tw from 'tailwind-styled-components';

import SideDisplay from './SideDisplay';
import { Button } from '@/components/ui/Button';
import Margin from '@/components/ui/Margin';
import { ChatType } from '../InGameRoom';

interface GameRightSidePropsType {
  isPainting: boolean;
  isGameStarted: boolean;
  leftTime: number;
  countDown: () => void;
  chatList: ChatType[];
  onChatInput: (chatInput: ChatType) => void;
}

export default function GameRightSide({
  isPainting,
  isGameStarted,
  leftTime,
  countDown,
  chatList,
  onChatInput,
}: GameRightSidePropsType) {
  // 채팅 관련 상태
  const [inputValue, setInputValue] = useState<string>('');

  // 타이머 관련 상태
  const [timerId, setTimerId] = useState<NodeJS.Timer>();

  // 채팅 전송
  const onChattingSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const chatContent = inputValue.trim();
    if (!chatContent) return;
    const chatInput: ChatType = {
      user: '아프리카청춘이다',
      status: 'chatting',
      content: chatContent,
    };
    onChatInput(chatInput);
    setInputValue('');
  };

  // 채팅 타이핑
  const onChattingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // 카운트 종료
  if (leftTime <= 0) {
    clearInterval(timerId);
  }

  useEffect(() => {
    if (!isGameStarted) return;
    // 카운트 다운
    const timer = setInterval(() => {
      countDown();
    }, 1000);
    setTimerId(timer);

    return () => {
      clearInterval(timer);
    };
  }, [countDown, isGameStarted]);

  return (
    <SideDisplay isLeft={false}>
      <div className="bg-white p-4 rounded-full">{leftTime}s</div>
      <Margin type="height" size={16} />
      <InGameChat>
        채팅
        <ChatView>
          {chatList.map((chat, idx) => (
            <li
              key={idx}
              className={chat.status === 'answer' ? 'bg-amber-300' : ''}
            >{`${chat.user} : ${chat.content}`}</li>
          ))}
        </ChatView>
        <ChatForm onSubmit={onChattingSubmit}>
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
          <Margin type="height" size={16} />
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
