import React from 'react';
import Image from 'next/image';

import tw from 'tailwind-styled-components';

import SideDisplay from './SideDisplay';
import Margin from '@/components/ui/Margin';

import { GameRoundType, GameUser } from '../InGameRoom';

interface GameLeftSidePropsType {
  isPainting: boolean;
  userList: GameUser[];
  gameRound: GameRoundType;
}

export default function GameLeftSide({
  isPainting,
  gameRound,
  userList,
}: GameLeftSidePropsType) {
  return (
    <SideDisplay isLeft={true}>
      <h2 className="text-2xl">
        {gameRound.now} / {gameRound.total}
      </h2>
      <Members>
        <h2>참가자 목록</h2>
        <Margin type="height" size={16} />
        <MemberList>
          {userList.map((user) => {
            return (
              <MemberItem key={user.id}>
                <Profile />
                <span className="truncate flex-auto">{user.nickname}</span>
                <MemberStatus>
                  <Image
                    src={
                      user.id === 1
                        ? '/icons/mic_mute.png'
                        : '/icons/sound_mute.png'
                    }
                    alt="mic mute"
                    width={16}
                    height={16}
                  />
                </MemberStatus>
              </MemberItem>
            );
          })}
        </MemberList>
      </Members>
      {isPainting && (
        <>
          <Margin type="height" size={16} />
          <div>색 수정</div>
          <Margin type="height" size={16} />
        </>
      )}
      <SoundSetting>
        <div className="bg-white p-2 rounded-full">
          <Image
            src="/icons/mic_mute.png"
            alt="mic mute"
            width={16}
            height={16}
          />
        </div>
        <div className="bg-white p-2 rounded-full">
          <Image
            src="/icons/sound_mute.png"
            alt="sound mute"
            width={16}
            height={16}
          />
        </div>
      </SoundSetting>
    </SideDisplay>
  );
}

const Members = tw.div`
  w-full
  bg-[#88CDFF]
  rounded-lg

  p-2

  flex
  flex-col
  items-center
  justify-between
`;

const MemberList = tw.div`
  w-full
  bg-gray-300
  rounded-lg
  text-sm

  p-2

  flex
  flex-col
  gap-4
`;

const MemberItem = tw.div`
  flex
  justify-between
  gap-2
  items-center
`;

const Profile = tw.div`
  w-5
  h-5
  rounded-full

  flex-none
  bg-white
`;

const MemberStatus = tw.div`
  flex-none

  flex
  justify-end
`;

const SoundSetting = tw.div`
  w-full
  bg-[#88CDFF]
  rounded-lg

  p-4

  flex
  justify-around
  items-center
`;
