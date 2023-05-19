import React from 'react';

import tw from 'tailwind-styled-components';

import SideDisplay from './SideDisplay';
import Margin, { MarginType } from '@/components/ui/Margin';
import { useAppSelector } from '@/store/thunkhook';
import Image from 'next/image';

export default function GameLeftSide({
  isPainting,
  paletteColor,
  changeColor,
}: {
  isPainting: boolean;
  paletteColor?: string;
  changeColor?: (color: string) => void;
}) {
  const { gameRound, gameUsers } = useAppSelector((state) => state);

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
        <Margin type={MarginType.height} size={16} />
        <MemberList>
          {gameUsers.map(({ userIdx, userNickname, userProfile }) => {
            return (
              <MemberItem key={userIdx}>
                <Profile>
                  <Image
                    src={userProfile}
                    alt="프로필"
                    fill
                    priority
                    sizes="100%"
                  />
                </Profile>
                <span className="truncate flex-auto">{userNickname}</span>
              </MemberItem>
            );
          })}
        </MemberList>
      </Members>
      {!isPainting && <div></div>}
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
  w-[32px]
  h-[32px]
  rounded-full
  overflow-hidden

  flex-none

  relative
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
