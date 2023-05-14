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
import { ReactNode, useState } from 'react';
import { gameAPI } from '@/api/api';
import { useAppSelector } from '@/store/thunkhook';
import MyProfile from './MyProfile';

interface NavbarPropsType {
  children: ReactNode;
}

export default function Navbar({ children }: NavbarPropsType) {
  const [open, setOpen] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const { isLogin } = useAppSelector((state) => state);
  const router = useRouter();
  const navbarPath = useSelector((state: RootState) => state.navbarPath);
  const dispatch = useDispatch<AppDispatch>();

  const enterRoom = async () => {
    await gameAPI
      .createRoom()
      .then((request) => {
        console.log(request.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    dispatch(setNavbarPath(router.pathname));
  }, [dispatch, router]);

  return (
    <div>
      <NavbarDiv>
        <LogoDiv>
          <button
            onClick={enterRoom}
            className={`${
              navbarPath.path.indexOf('room') !== -1
                ? 'bg-main-pink text-main-green'
                : 'bg-main-green text-main-pink '
            } px-8 py-2 rounded-lg  text-xs lg:text-xl sm:text-sm hover:bg-main-pink hover:text-main-green `}
          >
            게임하기
          </button>
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
          {isLogin ? (
            <MyProfile isClick={isClick} setIsClick={setIsClick} />
          ) : (
            <div>
              <Button
                px={8}
                py={2}
                rounded="lg"
                color="bg-main-pink"
                className="animate-bounce text-main-green text-xs lg:text-xl sm:text-sm"
                onClick={() => {
                  setOpen(true);
                }}
              >
                로그인
              </Button>
              <Login open={open} setOpen={setOpen} />
            </div>
          )}
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
