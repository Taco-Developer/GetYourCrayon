'use client';
import tw from 'tailwind-styled-components';
import { Button } from '../ui/Button';
import Login from '../login/Login';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { setNavbarPath } from '@/store/slice/navbarSlice';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

interface NavbarPropsType {
  children: ReactNode;
}

export default function Navbar({ children }: NavbarPropsType) {
  const router = useRouter();
  const navbarPath = useSelector((state: RootState) => state.navbarPath);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(setNavbarPath(router.pathname));
  }, [dispatch, router]);

  return (
    <div>
      <NavbarDiv>
        <LogoDiv>
          <Link
            href={'/room'}
            className={`${
              navbarPath.path.indexOf('room') !== -1
                ? 'bg-main-pink text-main-green'
                : 'bg-main-green text-main-pink '
            } px-8 py-2 rounded-lg  text-xs lg:text-xl sm:text-sm hover:bg-main-pink hover:text-main-green `}
          >
            게임하기
          </Link>
          <Link href={'/'}>
            <ImageDiv>
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
            className={`${
              navbarPath.path.indexOf('board') !== -1
                ? 'bg-main-pink text-main-green'
                : 'bg-main-green text-main-pink '
            } px-8 py-2 rounded-lg  text-xs lg:text-xl sm:text-sm hover:bg-main-pink hover:text-main-green `}
          >
            같이하기
          </Link>
        </LogoDiv>

        <LoginDiv>
          <Login />
        </LoginDiv>
      </NavbarDiv>

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
  absolute
  items-center
  w-screen
  justify-between
  mt-5
`;

const LoginDiv = tw.div`
  absolute
  md:right-10
  right-2
`;

const LogoDiv = tw.div`
  flex 
  gap-4 
  top-6
  left-0  
  right-0 
  justify-center 
  items-center
  flex-grow
`;
