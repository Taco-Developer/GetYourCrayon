import React from 'react';
import tw from 'tailwind-styled-components';
import Navbar from '@/components/navbar/Navbar';
import type { ReactElement } from 'react';
import Image from 'next/image';

export default function MyPage() {
  return (
    <Container className="grid-cols-12 grid">
      <div className="col-span-4 h-full w-full">
        <div className="flex flex-col justify-center items-center h-full">
          <div className="h-full flex justify-center items-center flex-col">
            <div className="relative w-36 h-36 rounded-profile-img overflow-hidden">
              <Image src="/images/loopy3.jpg" alt="no_img" fill sizes="100%" />
            </div>
            프로필 이미지
          </div>
          <div className="h-full flex justify-center items-center">
            정보변경
          </div>
        </div>
      </div>
      <div className="col-span-8 h-full w-full ">
        <div className="flex justify-center items-center h-full">
          마이페이지 컴포넌트부분
        </div>
      </div>
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

  min-h-container-height2
  h-full
  border-2
  mt-36
  mb-12
  bg-board-color

  px-12
  pt-4



  
`;
