import { ReactNode } from 'react';

import tw from 'tailwind-styled-components';

import Margin, { MarginType } from '@/components/ui/Margin';
import { useAppSelector } from '@/store/thunkhook';

export default function GameCenter({ children }: { children: ReactNode }) {
  const {
    gameTheme,
    answers: { savedAnswers },
    roomInfo: { gameCategory },
    gameDatas: { selectedUserIdx },
    userInfo: { userIdx },
  } = useAppSelector((state) => state);

  return (
    <MainContainer>
      <MainHeader>
        <Category>
          <span>주제: {gameTheme.selectedTheme}</span>
          {gameCategory === 'CatchMind' && userIdx === selectedUserIdx && (
            <span> / 제시어: {savedAnswers[0]}</span>
          )}
        </Category>
      </MainHeader>
      <Margin type={MarginType.height} size={16} />
      {children}
    </MainContainer>
  );
}

const MainContainer = tw.div`
  col-span-7

  flex
  flex-col
  items-center
  justify-between
`;

const MainHeader = tw.header`
  w-full
`;

const Category = tw.div`
  text-2xl
`;
