import React, { useState, useEffect } from 'react';
import tw from 'tailwind-styled-components';

export default function UserList() {
  return (
    <UserBody>
      <TitleDiv>플레이어 1/6</TitleDiv>
      <CntDiv>asdf</CntDiv>
      <ListDiv>a</ListDiv>
    </UserBody>
  );
}

const UserBody = tw.div`w-90 h-90 bg-white flex flex-col items-center justify-center`;
const TitleDiv = tw.div`w-full h-10 font-bold text-5xl flex items-center justify-center m-2`;
const CntDiv = tw.div`w-80 h-10 font-bold text-3xl flex items-center justify-start border-black border-2 rounded-lg m-2`;
const ListDiv = tw.div`w-90 h-70 bg-black m-2`;
