import Margin from '@/components/ui/Margin';
import Image from 'next/image';
import { ReactNode } from 'react';

import tw from 'tailwind-styled-components';

export default function GameCenter({ children }: { children: ReactNode }) {
  return (
    <MainContainer>
      <MainHeader>
        <ImageBox>
          <Image
            src="/images/logo.png"
            alt="브랜드 로고"
            fill
            sizes="100%"
            priority
          />
        </ImageBox>
        <Category>주제: </Category>
      </MainHeader>
      <Margin type="height" size={16} />
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

const ImageBox = tw.div`
  w-20
  h-20

  mx-auto

  relative
`;

const Category = tw.div`
  absolute

  bottom-0 right-0
`;
