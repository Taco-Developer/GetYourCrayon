import React, { useState, useEffect } from 'react';
import tw from 'tailwind-styled-components';
import Image from 'next/image';

export default function UserList() {
  const [player, setPlayer] = useState<string[]>([
    'A도겸',
    'B수민',
    '알루상현',
    'n트도영',
    '갓 덕호',
    '도커경민',
  ]);

  return (
    <UserBody>
      <TitleDiv>플레이어 1/6</TitleDiv>
      <CntDiv>asdf</CntDiv>
      <ListDiv>
        {player.map((user, i) => (
          <UserDiv key={i}>
            <Profile></Profile>
            <InnerDiv>
              <UserName>{user}</UserName>
              <CtrlDiv>
                <SoundIcon>
                  <Image
                    src="/icons/sound_on.png"
                    alt="sound_on"
                    width={512}
                    height={512}
                  />
                </SoundIcon>
                <MicIcon>
                  <Image
                    src="/icons/mic_on.png"
                    alt="sound_on"
                    width={512}
                    height={512}
                  />
                </MicIcon>
              </CtrlDiv>
            </InnerDiv>
          </UserDiv>
        ))}
      </ListDiv>
    </UserBody>
  );
}

const UserBody = tw.div`w-90 h-90 bg-white rounded-2xl flex flex-col items-center justify-center`;
const TitleDiv = tw.div`w-full h-10 font-bold text-3xl xl:text-5xl m-2 flex items-center justify-center`;
const CntDiv = tw.div`w-80 h-10 font-bold text-xl xl:text-3xl flex items-center justify-start border-black border-2 rounded-lg m-2 px-2`;
const ListDiv = tw.div`w-90 h-80 bg-orange-200 m-2 grid grid-rows-6`;
const UserDiv = tw.div`w-90 h-auto m-1 p-1 border-black border-2 rounded-l-full rounded-r-2xl flex items-center justify-between`;
const Profile = tw.div`h-full w-14 xl:w-16 border-black border-2 rounded-full bg-slate-100`;
const InnerDiv = tw.div`h-full w-full flex items-center justify-between`;
const UserName = tw.div`text-lg xl:text-2xl m-4`;
const CtrlDiv = tw.div`flex`;
const SoundIcon = tw.div`h-9 xl:h-9 w-9 xl:w-9`;
const MicIcon = tw.div`h-9 xl:h-9 w-9 xl:w-9`;
