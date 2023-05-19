import tw from 'tailwind-styled-components';
import ProfileDropDown from './ProfileDropDown';
import { useState, useRef, useEffect } from 'react';
import { useAppSelector } from '@/store/thunkhook';
import Image from 'next/image';
import { memberAPI } from '@/api/api';
import Link from 'next/link';
import { setCookie } from 'cookies-next';

interface isClickType {
  isClick: boolean;
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyProfile = ({ isClick, setIsClick }: isClickType) => {
  const ref = useRef<HTMLDivElement>(null);
  const { userInfo } = useAppSelector((state) => state);
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
  }, [setIsClick]);
  return (
    <div className="w-28 " ref={ref}>
      <div
        className="h-navbar-profile w-navbar-profile relative rounded-profile-img overflow-hidden"
        onClick={() => {
          setIsClick(!isClick);
        }}
      >
        <Image
          src={userInfo.userProfile}
          alt="no_img"
          priority
          fill
          sizes="100%"
        />
      </div>
      <ProfileDropDown setIsClick={setIsClick} isClick={isClick}>
        <Link
          href={'/mypage'}
          className="mb-3 text-center active:relative active:top-0.5"
          onClick={() => {
            setIsClick(false);
          }}
        >
          마이페이지
        </Link>

        <button
          className="pb-4  active:relative active:top-0.5"
          onClick={() => {
            const logout = async () => {
              try {
                await memberAPI.logout();
                //쿠키초기화
                setCookie('accesstoken', '');
              } catch (e) {
                console.log(e);
              } finally {
                location.href = '/';
              }
            };
            logout();
          }}
        >
          로그아웃
        </button>
      </ProfileDropDown>
    </div>
  );
};

export default MyProfile;
