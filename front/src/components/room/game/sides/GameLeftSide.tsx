import React from 'react';
import Image from 'next/image';

import tw from 'tailwind-styled-components';

import SideDisplay from './SideDisplay';
import Margin from '@/components/ui/Margin';

export default function GameLeftSide({ isPainting }: { isPainting: boolean }) {
  return (
    <SideDisplay isLeft={true}>
      <h2 className="text-2xl">1 / 5</h2>
      <Margin type="height" size={16} />
      <Members>
        <h2>참가자 목록</h2>
        <Margin type="height" size={16} />
        <MemberList>
          {[1, 2, 3, 4, 5, 6].map((id) => {
            return (
              <MemberItem key={id}>
                <Profile />
                <Margin type="width" size={8} />
                {`참가자 ${id}`}
                <MemberStatus>
                  <Image
                    src={
                      id === 1 ? '/icons/mic_mute.png' : '/icons/sound_mute.png'
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
      <Margin type="height" size={16} />
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

  p-4

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

  px-4
  py-4

  flex
  flex-col
  gap-2
`;

const MemberItem = tw.div`
  flex
  items-center
`;

const Profile = tw.div`
  w-4
  h-4
  rounded-full

  bg-white
`;

const MemberStatus = tw.div`
  flex-auto

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
