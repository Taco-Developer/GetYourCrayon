import React from 'react';

import Image from 'next/image';

import tw from 'tailwind-styled-components';

import Margin, { MarginType } from '@/components/ui/Margin';
import { useAppSelector } from '@/store/thunkhook';
import { Button } from '@/components/ui/Button';
import { sendMessage } from '@/socket/messageSend';

export default function GameResult({ socket }: { socket: WebSocket }) {
  const { gameUsers } = useAppSelector((state) => state);

  return (
    <Container>
      <main className="flex-auto flex gap-6 overflow-hidden">
        <LeftSection>
          <Margin type={MarginType.height} size={16} />
          <div className="flex justify-center gap-2 text-2xl">
            <h2>플레이어</h2>
            <span>6/6</span>
          </div>
          <Margin type={MarginType.height} size={40} />
          <UserList>
            {gameUsers.map(({ userIdx, userNickname, userProfile }) => (
              <UserItem key={userIdx}>
                <UserProfile>
                  <Image
                    src={userProfile}
                    alt="프로필"
                    fill
                    sizes="100%"
                    priority
                  />
                </UserProfile>
                <span className="text-ellipsis">{userNickname}</span>
                <div className="flex-auto flex justify-end text-2xl"></div>
              </UserItem>
            ))}
          </UserList>
          <Margin type={MarginType.height} size={40} />
        </LeftSection>
        <RightSection>
          <div className="flex-auto rounded-xl bg-[#5AAEFC] p-4 overflow-y-auto">
            <h2 className="text-2xl">결과 보기</h2>
            <Margin type={MarginType.height} size={16} />
            <ul className="">
              {gameUsers.map(
                ({ userProfile, userNickname, userScore, userIdx }) => (
                  <li key={userIdx}>
                    <div className="flex items-center">
                      <UserProfile>
                        <Image
                          src={userProfile}
                          alt="프로필"
                          fill
                          sizes="100%"
                          priority
                        />
                      </UserProfile>
                      <Margin type={MarginType.width} size={8} />
                      <span>{userNickname}</span>
                      <Margin type={MarginType.width} size={16} />
                      <span className="text-2xl">{userScore}</span>
                    </div>
                  </li>
                ),
              )}
            </ul>
          </div>
          <div className="flex justify-center">
            <Button
              px={6}
              py={2}
              rounded="2xl"
              color="bg-[#5AAEFC]"
              className="text-xl text-white"
              onClick={() => {
                sendMessage(socket, 'gameAlert', { status: 'ready' });
              }}
            >
              대기방
            </Button>
            <Margin type={MarginType.width} size={40} />
            <Button
              px={6}
              py={2}
              color="bg-amber-500"
              rounded="2xl"
              className="text-xl"
              onClick={() => {
                sendMessage(socket, 'gameAlert', { status: 'gameStart' });
              }}
            >
              다시하기
            </Button>
          </div>
        </RightSection>
      </main>
    </Container>
  );
}

const Container = tw.div`
    w-screen
    h-screen
    
    xl:w-10/12
    xl:rounded-lg

    bg-white/[.5]

    p-8

    flex
    flex-col
`;

const LeftSection = tw.div`
    w-1/4 
    
    bg-[#5AAEFC] 
    rounded-xl 

    flex 
    flex-col
`;

const RightSection = tw.div`
    flex-auto
    
    flex
    flex-col
    gap-6
`;

const UserList = tw.ul`
    flex-auto
    
    px-2 
    
    flex 
    flex-col 
    justify-around
`;

const UserItem = tw.li`
    w-full

    p-2

    flex
    items-center
    gap-2

    outline
    outline-1
    outline-white
    rounded-l-full
`;

const UserProfile = tw.div`
    w-[40px] 
    h-[40px] 

    bg-white 
    rounded-full
`;
