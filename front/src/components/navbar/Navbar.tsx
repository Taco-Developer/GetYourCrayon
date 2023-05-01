import tw from 'tailwind-styled-components';
import { Button } from '../ui/Button';
import Image from 'next/image';

import { ReactNode } from 'react';

interface NavbarPropsType {
  children: ReactNode;
}

export default function Navbar({ children }: NavbarPropsType) {
  return (
    <div>
      <div className="flex gap-4 absolute top-0 left-0 right-0 justify-center items-center">
        <Button
          px={8}
          py={2}
          rounded="lg"
          color="bg-main-green"
          className=" text-main-pink"
        >
          게임하기
        </Button>
        <div className="relative h-24 w-24">
          <Image
            src={'/images/logo.png'}
            alt="noimg"
            priority
            fill
            sizes="100%"
          />
        </div>

        <Button
          px={8}
          py={2}
          rounded="lg"
          color="bg-main-green"
          className=" text-main-pink"
        >
          마이페이지
        </Button>
      </div>
      <div className="absolute flex right-0 top-0 justify-center items-center mt-8 text-2xl">
        <div>로그인</div>
      </div>

      {children}
    </div>
  );
}
