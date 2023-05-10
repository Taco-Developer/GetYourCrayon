import { ReactNode } from 'react';

import tw from 'tailwind-styled-components';

import Margin, { MarginType } from '@/components/ui/Margin';
import { useAppSelector } from '@/store/thunkhook';

export default function GameCenter({ children }: { children: ReactNode }) {
  const { gameTheme } = useAppSelector((state) => state);

  return (
    <MainContainer>
      <MainHeader>
        <Category>주제: {gameTheme.selectedTheme}</Category>
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

  relative
`;

const Category = tw.div`
  absolute

  bottom-0 right-0
`;
