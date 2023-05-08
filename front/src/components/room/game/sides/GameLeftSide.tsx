import React, { useState } from 'react';

import tw from 'tailwind-styled-components';

import SideDisplay from './SideDisplay';
import Margin from '@/components/ui/Margin';
import Mic from '@/components/ui/icons/Mic';
import SoundVolume from '@/components/ui/icons/SoundVolume';
import { useAppSelector } from '@/store/thunkhook';

export default function GameLeftSide({
  isPainting,
  paletteColor,
  changeColor,
}: {
  isPainting: boolean;
  paletteColor?: string;
  changeColor?: (color: string) => void;
}) {
  const { gameRound, userList } = useAppSelector((state) => state.inGame);

  const colors = [
    ['#000000', 'bg-[#000000]'],
    ['#D21312', 'bg-[#D21312]'],
    ['#562B08', 'bg-[#562B08]'],
    ['#D89216', 'bg-[#D89216]'],
    ['#F9D276', 'bg-[#F9D276]'],
    ['#A7D129', 'bg-[#A7D129]'],
    ['#EA0599', 'bg-[#EA0599]'],
    ['#00FFF5', 'bg-[#00FFF5]'],
    ['#0C134F', 'bg-[#0C134F]'],
    ['#AA77FF', 'bg-[#AA77FF]'],
  ];

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
      {isPainting && (
        <ColorPalettes>
          <input
            type="color"
            className="row-span-2 col-span-3 w-full h-full"
            value={paletteColor}
            onChange={(event) => {
              console.log(event.target.value);
              changeColor!(event.target.value);
            }}
          />
          {colors.map((color) => (
            <div
              key={color[0]}
              className={color[1]}
              onClick={() => {
                changeColor!(color[0]);
              }}
            />
          ))}
        </ColorPalettes>
      )}
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

  p-2

  flex
  justify-around
  items-center
`;

const ColorPalettes = tw.div`
  flex-auto  
  w-full

  p-4

  bg-white
  rounded-lg

  grid
  grid-rows-5
  grid-cols-3
  gap-2
`;