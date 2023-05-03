import tw from 'tailwind-styled-components';
import { Button } from '../ui/Button';
import Login from '../login/Login';
import Image from 'next/image';
import Link from 'next/link';

import { ReactNode } from 'react';

interface NavbarPropsType {
  children: ReactNode;
}

export default function Navbar({ children }: NavbarPropsType) {
  return (
    <div>
      <NavbarDiv>
        <Link
          href={'/room'}
          className="px-8 py-2 rounded-lg bg-main-green text-main-pink text-xs lg:text-xl sm:text-sm hover:bg-main-pink hover:text-main-green"
        >
          게임하기
        </Link>
        <Link href={'/'}>
          <ImageDiv>
            {' '}
            <Image
              src={'/images/logo.png'}
              alt="noimg"
              priority
              fill
              sizes="100%"
            />
          </ImageDiv>
        </Link>
        <Link
          href={'/board'}
          className="px-8 py-2 rounded-lg bg-main-green text-main-pink text-xs lg:text-xl sm:text-sm hover:bg-main-pink hover:text-main-green"
        >
          같이하기
        </Link>
      </NavbarDiv>
      <LoginDiv>
        <Login />
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
  top-6
  left-0 
  right-0 
  justify-center 
  items-center
`;

const LoginDiv = tw.div`
  absolute 
  flex 
  right-login-custom 
  top-5
  justify-center 
  items-center mt-8
`;
