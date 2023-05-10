import React, { useState } from 'react';
import tw from 'tailwind-styled-components';

export default function ReadyBtn() {
  return (
    <OutDiv>
      <h1>버튼~</h1>
      <h1>버튼~</h1>
      <h1>버튼~</h1>
    </OutDiv>
  );
}

const OutDiv = tw.div`h-full w-full flex items-center justify-between`;
