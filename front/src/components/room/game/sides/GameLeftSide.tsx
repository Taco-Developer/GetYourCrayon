import React, { useState } from 'react';

import tw from 'tailwind-styled-components';

import SideDisplay from './SideDisplay';
import Margin from '@/components/ui/Margin';
import Mic from '@/components/ui/icons/Mic';
import SoundVolume from '@/components/ui/icons/SoundVolume';
import { useAppSelector } from '@/store/thunkhook';

export default function GameLeftSide({ isPainting }: { isPainting: boolean }) {
  const { gameRound, userList } = useAppSelector((state) => state.inGame);

  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVolumeMuted, setIsVolumeMuted] = useState(false);

  const micOptionClickHandler = () => {
    setIsMicMuted((prev) => !prev);
  };

  const volumeOptionClickHandler = () => {
    setIsVolumeMuted((prev) => !prev);
  };

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
                  {user.id % 2 === 0 ? (
                    <div className="text-base">
                      <Mic
                        isMuted={user.id === 2 ? false : true}
                        isMyStatus={false}
                      />
                    </div>
                  ) : (
                    <div className="text-base">
                      <SoundVolume
                        isMuted={user.id === 3 ? false : true}
                        isMyStatus={false}
                      />
                    </div>
                  )}
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
        <div
          className="bg-white rounded-full w-[32px] h-[32px] flex justify-center items-center"
          onClick={micOptionClickHandler}
        >
          <Mic isMuted={isMicMuted} isMyStatus={true} />
        </div>
        <div
          className="bg-white rounded-full w-[32px] h-[32px] flex justify-center items-center"
          onClick={volumeOptionClickHandler}
        >
          <SoundVolume isMuted={isVolumeMuted} isMyStatus={true} />
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
