import React, { useState } from 'react';
import tw from 'tailwind-styled-components';

export default function Setting() {
  return (
    <OutDiv>
      <TimeDiv>
        <InnerDiv>
          <SetName>시간</SetName>
          <WhatDiv>
            <DropLabel>
              <PickDrop>빠르게</PickDrop>
              <DropDiv>{'<'}</DropDiv>
            </DropLabel>
            <DropContent>
              <DropUl>
                <DropLi>느리게</DropLi>
                <DropLi>보통</DropLi>
                <DropLi>빠르게</DropLi>
                <DropLi>초고속</DropLi>
              </DropUl>
            </DropContent>
          </WhatDiv>
        </InnerDiv>
      </TimeDiv>
      <TurnDiv>
        <InnerDiv>
          <SetName>턴</SetName>
          <WhatDiv>
            <DropLabel>
              <PickDrop>빠르게</PickDrop>
              <DropDiv>{'<'}</DropDiv>
            </DropLabel>
            <DropContent>
              <DropUl>
                <DropLi>느리게</DropLi>
                <DropLi>보통</DropLi>
                <DropLi>빠르게</DropLi>
                <DropLi>초고속</DropLi>
              </DropUl>
            </DropContent>
          </WhatDiv>
        </InnerDiv>
      </TurnDiv>
    </OutDiv>
  );
}

const OutDiv = tw.div`h-20 w-full flex flex-col items-center justify-center`;
const TimeDiv = tw.div`h-50 w-full border-black border-2 rounded-2xl m-1`;
const TurnDiv = tw.div`h-50 w-full border-black border-2 rounded-2xl m-1`;
const InnerDiv = tw.div`h-full flex flex-row items-center justify-between mx-10 relative`;
const SetName = tw.div`text-2xl`;
const WhatDiv = tw.div`h-90 w-50 border-black border-2 rounded-xl flex`;
const DropLabel = tw.div` w-full flex felx-row items-center justify-between px-4`;
const PickDrop = tw.div``;
const DropDiv = tw.div``;
const DropContent = tw.div`w-full hidden absolute`;
const DropUl = tw.ul`list-none`;
const DropLi = tw.li``;
