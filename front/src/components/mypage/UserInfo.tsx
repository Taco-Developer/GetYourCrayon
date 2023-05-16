import Image from 'next/image';
import ChangeName from './ChangeName';
import { Button } from '@/components/ui/Button';
import React from 'react';
import tw from 'tailwind-styled-components';
import { useAppSelector } from '@/store/thunkhook';

/**프로필 이미지, 닉네임변경 컴포넌트 */
export default function UserInfo() {
  const { mypageInfo } = useAppSelector((state) => state);

  return (
    <UserInfoDiv>
      <ProfileDiv>
        <ProfileImgDiv>
          <Image
            src={mypageInfo.profile.userProfile}
            alt="no_img"
            fill
            sizes="100%"
            priority
          />
        </ProfileImgDiv>
      </ProfileDiv>
      <InfoBottomDiv>
        <NicknameDiv>
          <div>{mypageInfo.profile.userNickname}</div>
          <div>Point : {mypageInfo.profile.userPoint}</div>
        </NicknameDiv>
        <InfoChangeDiv>
          <ChangeName />
        </InfoChangeDiv>
      </InfoBottomDiv>
    </UserInfoDiv>
  );
}

const ProfileImgDiv = tw.div`
 relative
 w-profile-img 
 h-profile-img 
 rounded-profile-img 
 overflow-hidden
`;

const ProfileDiv = tw.div`
 h-full 
 flex 
 justify-center 
 items-center 
 flex-col

`;

const UserInfoDiv = tw.div`
 col-span-3 
 h-full 
 w-full 
 bg-board-color 
 flex 
 flex-col 
 justify-center 
 items-center
 rounded-t-2xl 
`;

const NicknameDiv = tw.div`
 w-full 
 h-full 
 text-sm 
 md:text-lg 
 lg:text-2xl 
 xl:text-3xl 
 flex 
 justify-center 
 items-center
 flex-col
`;

const InfoBottomDiv = tw.div`
 h-full 
 flex 
 flex-col 
 justify-center 
 items-center
`;

const InfoChangeDiv = tw.div`
 w-full 
 h-full 
 flex 
 items-baseline 
 justify-start 
 lg:text-lg
 xl:text-xl
`;
