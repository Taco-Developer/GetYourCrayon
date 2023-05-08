import React from 'react';
import tw from 'tailwind-styled-components';
import Navbar from '@/components/navbar/Navbar';
import type { ReactElement } from 'react';

export default function MyPage() {
  return (
    <Container>
      <div>ddd</div>
      <div>divds</div>
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

  gap-4
  min-h-container-height2
  h-full
  border-2
  mt-36
  mb-12
  bg-board-color



  px-12
  pt-4

  flex
  flex-row

  
`;
