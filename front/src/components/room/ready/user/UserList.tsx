import React, { useState, useEffect } from 'react';
import tw from 'tailwind-styled-components';

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
            <UserName>{user}</UserName>
          </UserDiv>
        ))}
      </ListDiv>
    </UserBody>
  );
}

const UserBody = tw.div`w-90 h-90 bg-white flex flex-col items-center justify-center`;
const TitleDiv = tw.div`w-full h-10 font-bold text-5xl flex items-center justify-center m-2`;
const CntDiv = tw.div`w-80 h-10 font-bold text-3xl flex items-center justify-start border-black border-2 rounded-lg m-2`;
const ListDiv = tw.div`w-90 h-70 bg-orange-200 m-2 flex flex-col items-center justify-start`;
const UserDiv = tw.div`w-90 h-20 m-1 p-1 border-black border-2 rounded-l-full rounded-r-2xl flex items-center justify-start`;
const Profile = tw.div`h-full w-20 border-black border-2 rounded-full bg-slate-100`;
const UserName = tw.div`text-2xl m-4`;

// 그리드로 적용하자
