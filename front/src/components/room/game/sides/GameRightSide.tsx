import React from 'react';

import tw from 'tailwind-styled-components';

import SideDisplay from './SideDisplay';
import { Button } from '@/components/ui/Button';
import Margin from '@/components/ui/Margin';
import { Input } from '@/components/ui/Input';

export default function GameRightSide({ isPainting }: { isPainting: boolean }) {
  return (
    <SideDisplay isLeft={false}>
      <div className="bg-white p-4 rounded-full">60S</div>
      <Margin type="height" size={16} />
      <Chat>
        채팅
        <ChatView></ChatView>
        <ChatForm>
          <input
            type="text"
            name=""
            id=""
            className="w-full bg-transparent flex-auto px-2 outline-none"
            placeholder="채팅을 입력하세요"
          />
          <Button px={2} py={2} rounded="lg" color="bg-amber-300" className="">
            입력
          </Button>
        </ChatForm>
      </Chat>
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

const Chat = tw.div`
  flex-auto

  w-full
  bg-[#88CDFF]
  rounded-lg

  p-4

  flex
  flex-col
  items-center
  gap-4
`;

const ChatView = tw.div`
  flex-auto

  w-full
  bg-white
  rounded-lg

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
