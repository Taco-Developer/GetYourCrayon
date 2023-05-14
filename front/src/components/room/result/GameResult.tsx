import React from 'react';

import Image from 'next/image';

import tw from 'tailwind-styled-components';

import Margin, { MarginType } from '@/components/ui/Margin';
import { useAppSelector } from '@/store/thunkhook';
import { Button } from '@/components/ui/Button';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

/** 결과 목록 */
const INIT_RESULTS = [
  {
    user: { userid: 1, nickname: '아프리카청춘이다', profileImg: '' },
    result:
      'https://img.freepik.com/free-vector/cute-corgi-dog-sitting-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-4181.jpg?size=626&ext=jpg&ga=GA1.1.1340115615.1672808342&semt=sph',
  },
  {
    user: { userid: 1, nickname: '아프리카청춘이다', profileImg: '' },
    result:
      'https://img.freepik.com/free-vector/cute-corgi-dog-sitting-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-4181.jpg?size=626&ext=jpg&ga=GA1.1.1340115615.1672808342&semt=sph',
  },
  {
    user: { userid: 1, nickname: '아프리카청춘이다', profileImg: '' },
    result:
      'https://img.freepik.com/free-vector/cute-corgi-dog-sitting-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-4181.jpg?size=626&ext=jpg&ga=GA1.1.1340115615.1672808342&semt=sph',
  },
  {
    user: { userid: 1, nickname: '아프리카청춘이다', profileImg: '' },
    result:
      'https://img.freepik.com/free-vector/cute-corgi-dog-sitting-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-4181.jpg?size=626&ext=jpg&ga=GA1.1.1340115615.1672808342&semt=sph',
  },
  {
    user: { userid: 1, nickname: '아프리카청춘이다', profileImg: '' },
    result:
      'https://img.freepik.com/free-vector/cute-corgi-dog-sitting-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-4181.jpg?size=626&ext=jpg&ga=GA1.1.1340115615.1672808342&semt=sph',
  },
];

export default function GameResult({ client }: { client: W3CWebSocket }) {
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
            {gameUsers.map((user) => (
              <UserItem key={user.id}>
                <UserProfile />
                <span className="text-ellipsis">{user.nickname}</span>
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
              {INIT_RESULTS.map((result, idx) => (
                <li key={idx}>
                  <div className="flex items-center">
                    <UserProfile />
                    <Margin type={MarginType.width} size={8} />
                    <span>{result.user.nickname}</span>
                  </div>
                  <Margin type={MarginType.height} size={8} />
                  <div className="flex">
                    <Margin type={MarginType.width} size={40} />
                    <Image
                      src={result.result}
                      alt="유저가 그린 그림"
                      width={200}
                      height={200}
                    />
                  </div>
                  <Margin type={MarginType.height} size={16} />
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center">
            <Button
              px={6}
              py={2}
              rounded="2xl"
              color="bg-[#5AAEFC]"
              className="text-xl text-white"
            >
              나가기
            </Button>
            <Margin type={MarginType.width} size={40} />
            <Button
              px={6}
              py={2}
              color="bg-amber-500"
              rounded="2xl"
              className="text-xl"
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
