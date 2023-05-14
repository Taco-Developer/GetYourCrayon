import tw from 'tailwind-styled-components';
import ProfileDropDown from './ProfileDropDown';
import { useState, useRef, useEffect } from 'react';
import { useAppSelector } from '@/store/thunkhook';
import Image from 'next/image';
import { memberAPI } from '@/api/api';
import Link from 'next/link';

interface isClickType {
  isClick: boolean;
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyProfile = ({ isClick, setIsClick }: isClickType) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsClick(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
  return (
    <div className="" ref={ref}>
      <div
        className="h-navbar-profile w-navbar-profile relative rounded-profile-img overflow-hidden"
        onClick={() => {
          setIsClick(!isClick);
        }}
      >
        <Image
          src={'/images/loopy2.jpg'}
          alt="no_img"
          priority
          fill
          sizes="100%"
        />
      </div>
      {isClick && (
        <ProfileDropDown setIsClick={setIsClick}>
          <div className="mb-3 hover:text-mainColorOrange active:relative active:top-0.5">
            <Link href={'/mypage'}>마이페이지</Link>
          </div>
          <div
            className="pb-4 hover:text-mainColorOrange active:relative active:top-0.5"
            onClick={() => {
              const logout = async () => {
                await memberAPI
                  .logout()
                  .then((request) => console.log(request))
                  .catch((e) => console.log(e));
              };
              logout();
            }}
          >
            로그아웃
          </div>
        </ProfileDropDown>
      )}
    </div>
  );
};

export default MyProfile;
