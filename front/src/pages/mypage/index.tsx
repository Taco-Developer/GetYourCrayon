import React from 'react';
import tw from 'tailwind-styled-components';
import Navbar from '@/components/navbar/Navbar';
import type { ReactElement } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import UserInfo from '@/components/mypage/UserInfo';
import Contents from '@/components/mypage/Contents';

export default function MyPage() {
  return (
    <Container>
      <UserInfo />
      <Contents />
    </Container>
  );
}

MyPage.getLayout = function getLayout(page: ReactElement) {
  return <Navbar>{page}</Navbar>;
};

const Container = tw.div`
  w-screen
  xl:w-10/12
  md:w-9/12
  gap-2
  grid-cols-12 
  grid
  min-h-container-height2
  h-full
  mt-36
  mb-12
`;
