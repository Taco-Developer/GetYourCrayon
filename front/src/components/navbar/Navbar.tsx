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
      <NavbarDiv>
        <Button
          px={8}
          py={2}
          rounded="lg"
          color="bg-main-green"
          className=" text-main-pink text-xs lg:text-xl sm:text-sm"
        >
          게임하기
        </Button>
        <ImageDiv>
          <Image
            src={'/images/logo.png'}
            alt="noimg"
            priority
            fill
            sizes="100%"
          />
        </ImageDiv>

        <Button
          px={8}
          py={2}
          rounded="lg"
          color="bg-main-green"
          className=" text-main-pink text-xs lg:text-xl sm:text-sm"
        >
          같이하기
        </Button>
      </NavbarDiv>
      <LoginDiv>
        <Button
          px={8}
          py={2}
          rounded="lg"
          color="bg-main-pink"
          className="animate-bounce text-main-green text-xs lg:text-xl sm:text-sm"
        >
          로그인
        </Button>
      </LoginDiv>

      {children}
    </div>
  );
}

const ImageDiv = tw.div`
  relative
  h-24
  w-24
`;

const NavbarDiv = tw.div`
  flex 
  gap-4 
  absolute 
  top-2
  left-0 
  right-0 
  justify-center 
  items-center
`;

const LoginDiv = tw.div`
  absolute 
  flex 
  right-login-custom 
  top-1
  justify-center 
  items-center mt-8
`;
