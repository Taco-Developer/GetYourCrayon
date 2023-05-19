import React, { useState, useRef, useEffect } from 'react';

import tw from 'tailwind-styled-components';

import SideDisplay from './SideDisplay';
import { Button } from '@/components/ui/Button';
import Margin, { MarginType } from '@/components/ui/Margin';

import { useAppSelector } from '@/store/thunkhook';
import { sendMessage } from '@/socket/messageSend';

interface GameRightSidePropsType {
  isPainting: boolean;
  socket: WebSocket;
}

export default function GameRightSide({
  isPainting,
  socket,
}: GameRightSidePropsType) {
  const {
    leftTime,
    inGameChatDatas,
    roomInfo: { gameCategory },
    userInfo: { userIdx, userNickname },
  } = useAppSelector((state) => state);

  const chatViewRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    chatViewRef.current?.scrollIntoView({ behavior: 'auto', block: 'end' });
  }, [inGameChatDatas]);

  // 채팅 입력값
  const [inputValue, setInputValue] = useState<string>('');
  // 채팅 입력
  const chattingChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputValue(event.target.value);
  };
  // 채팅 전송
  const chatSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const chat = inputValue.trim();
    if (!chat) return;
    const chatInput = {
      user: userNickname,
      status: 'chatting',
      content: chat,
      userIdx,
    };
    sendMessage(socket, 'chat', chatInput);
    setInputValue('');
  };

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
          <div ref={chatViewRef} />
        </ChatView>
        <ChatForm onSubmit={chatSubmitHandler}>
          <input
            type="text"
            className="w-full bg-transparent flex-auto px-2 outline-none"
            placeholder="채팅을 입력하세요"
            value={inputValue}
            onChange={chattingChangeHandler}
            maxLength={20}
          />
          <Button px={2} py={2} rounded="lg" color="bg-amber-300" className="">
            입력
          </Button>
        </ChatForm>
      </InGameChat>
      {isPainting && gameCategory === 'Lier' && (
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

  overflow-y-hidden
`;

const ChatView = tw.ul`
  flex-auto

  w-full

  bg-white
  rounded-lg

  p-4

  overflow-y-auto
  scrollbar-bu
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
