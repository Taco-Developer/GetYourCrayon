import React, { useEffect, useState, useRef } from 'react';

import Image from 'next/image';

import tw from 'tailwind-styled-components';

import Margin, { MarginType } from '@/components/ui/Margin';
import { useAppDispatch, useAppSelector } from '@/store/thunkhook';
import { Button } from '@/components/ui/Button';
import { sendMessage } from '@/socket/messageSend';
import { setGameUsers } from '@/store/slice/game/gameUsersSlice';
import { listenEvent, removeEvent } from '@/socket/socketEvent';
import { resetRound } from '@/store/slice/game/gameRoundSlice';

interface UrlListType {
  [key: number]: string[];
}

export default function GameResult({ socket }: { socket: WebSocket }) {
  const {
    gameUsers,
    roomInfo: { maxRound, roomMax, adminUserIdx },
    userInfo: { userIdx },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [urlList, setUrlList] = useState<UrlListType>();
  const [urlKey, setUrlKey] = useState(0);
  const [showDatas, setShowDatas] = useState<string[][]>([]);
  const resultRef = useRef<HTMLDivElement>(null);

  // socket 이벤트 등록 및 전송
  useEffect(() => {
    if (!socket) return;
    const messageHandler = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data.type !== 'gameOver') return;

      const { userList, urlList } = data;
      dispatch(setGameUsers(userList));
      if (urlList) setUrlList(urlList);
    };

    listenEvent(socket, messageHandler);

    if (userIdx === adminUserIdx) sendMessage(socket, 'gameOver');

    return () => {
      removeEvent(socket, messageHandler);
    };
  }, [socket, dispatch, userIdx, adminUserIdx]);

  // 1초마다 urlIdx 1 증가
  useEffect(() => {
    if (!urlList) return;
    if (maxRound === urlKey) return;

    const timer = setInterval(() => {
      setUrlKey((prevKey) => prevKey + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [urlList, maxRound, urlKey]);

  // urlIdx가 증가하면 showDatas 추가
  useEffect(() => {
    if (urlKey < 1 || !urlList) return;
    setShowDatas((prev) => [...prev, urlList[urlKey]]);
  }, [urlList, urlKey]);

  useEffect(() => {
    resultRef.current?.scrollIntoView({ behavior: 'auto', block: 'end' });
  }, [showDatas]);

  return (
    <Container>
      <main className="flex-auto flex gap-6 overflow-hidden">
        <LeftSection>
          <div className="flex justify-center gap-2 text-2xl">
            <h2>플레이어</h2>
            <span>
              {gameUsers.length} / {roomMax}
            </span>
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
        </LeftSection>
        <RightSection>
          <div className="h-full rounded-xl bg-[#5AAEFC] px-8 py-6 overflow-hidden flex flex-col">
            <h2 className="text-2xl">게임 결과</h2>
            <Margin type={MarginType.height} size={24} />
            <ul className="flex-auto w-full flex flex-col gap-8 overflow-y-auto scrollbar-bu">
              {showDatas.map((url, idx) => (
                <li key={idx} className="w-full">
                  <h3 className="text-xl">{idx + 1} 라운드</h3>
                  <Margin type={MarginType.height} size={16} />
                  <div className="w-full grid grid-cols-2 grid-rows-2 gap-4">
                    {url &&
                      url.length === 4 &&
                      url.map((img, idx) => (
                        <div
                          key={idx}
                          className="w-4/5 h-[200px] relative rounded-lg"
                        >
                          <Image
                            src={img}
                            alt="AI 제작 이미지"
                            fill
                            sizes="100%"
                            priority
                          />
                        </div>
                      ))}
                    {url &&
                      url.length === 1 &&
                      url.map((img, idx) => (
                        <div
                          key={idx}
                          className="col-span-2 row-span-2 h-[400px] relative rounded-lg"
                        >
                          <Image
                            src={img}
                            alt="AI 제작 이미지"
                            fill
                            sizes="100%"
                            priority
                          />
                        </div>
                      ))}
                  </div>
                </li>
              ))}
              <div ref={resultRef} />
            </ul>
            <div></div>
          </div>
          {userIdx === adminUserIdx && (
            <div className="flex justify-center">
              <Button
                px={8}
                py={2}
                rounded="2xl"
                color="bg-[#5AAEFC]"
                className="text-xl text-white"
                onClick={() => {
                  dispatch(resetRound());
                  sendMessage(socket, 'gameAlert', { status: 'ready' });
                }}
              >
                대기방
              </Button>
              <Margin type={MarginType.width} size={40} />
              <Button
                px={8}
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
          )}
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
    
    p-6

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
    
    flex 
    flex-col 
    justify-around
    gap-6
`;

const UserItem = tw.li`
    p-2

    flex
    items-center
    gap-2

    outline
    outline-2
    outline-white
    rounded-l-full
`;

const UserProfile = tw.div`
    w-[48px] 
    h-[48px] 

    bg-white 
    rounded-full

    overflow-hidden

    relative
`;
