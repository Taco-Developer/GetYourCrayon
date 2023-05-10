import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
import Link from 'next/link';
import Invite from './Invite';

export default function ReadyBtn() {
  const [copyUrl, setCopyUrl] = useState<string>(
    'https://getyourcrayon.co.kr/room/',
  );

  // url 카피하는 함수
  const handleCopyClick = (code: string) => {
    navigator.clipboard.writeText(copyUrl + code);
  };
  // (미완) 게시글 작성하는 함수 api 확인되어야 가능
  const creatCopyUrl = (code: string) => {
    navigator.clipboard.writeText(copyUrl + code);
  };

  return (
    <OutDiv>
      <Link href={'/'} className="w-30 h-full">
        <GoBtn className="w-full">나가기</GoBtn>
      </Link>
      <ModalBtn>
        <Invite copyAction={handleCopyClick} />
      </ModalBtn>
      <GoBtn>게임시작</GoBtn>
    </OutDiv>
  );
}

const OutDiv = tw.div`h-full w-full flex items-center justify-between pt-1`;
const ModalBtn = tw.div`h-full w-30`;
const GoBtn = tw.button`h-full w-30 rounded-xl bg-main-green hover:bg-main-pink text-white text-3xl`;
