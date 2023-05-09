import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
import Dropdown from './Dropdown';

export default function Setting() {
  return (
    <OutDiv>
      <SelectDiv>
        시간
        <DropDiv>드롭다운</DropDiv>
      </SelectDiv>
      <SelectDiv>
        턴<DropDiv>드롭다운</DropDiv>
      </SelectDiv>
    </OutDiv>
  );
}

const OutDiv = tw.div`h-20 w-full flex flex-col items-center justify-center`;
const SelectDiv = tw.div`h-40 w-full text-2xl border-white border-2 rounded-xl flex flex-row items-center justify-between my-1 px-5`;
const DropDiv = tw.div`h-full w-50 border-black border-2 flex flex-row items-center justify-around`;
