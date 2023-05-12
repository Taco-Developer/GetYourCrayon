import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
import Link from 'next/link';
import Invite from './Invite';

import { boardAPI } from '@/api/api';
import { useAppDispatch, useAppSelector } from '@/store/thunkhook';
import { changeRole } from '@/store/slice/game/userDataSlice';

interface ReadyProps {
  boardId: number | null;
  setBoardId: React.Dispatch<React.SetStateAction<number | null>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}

export default function ReadyBtn({
  boardId,
  setBoardId,
  setStatus,
}: ReadyProps) {
  const { userId } = useAppSelector((state) => state.userData);
  const dispatch = useAppDispatch();
  const [baseUrl, setBaseUrl] = useState<string>(
    'https://getyourcrayon.co.kr/room/',
  );

  /** url 카피하는 함수 */
  const handleCopyClick = (url: string) => {
    navigator.clipboard.writeText(baseUrl + url);
  };
  /**게시글 작성 및 업데이트*/
  const creatBaseUrl = async (title: string, url: string) => {
    let defaultTitle: string;
    if (boardId === null) {
      if (title === '') {
        defaultTitle = '같이할사람 여기여기 붙어라 :)';
      } else {
        defaultTitle = title;
      }
      await boardAPI.postBoard(defaultTitle, baseUrl + url).then((request) => {
        setBoardId(request.data.id);
      });
    } else {
      await boardAPI
        .updateBoard(boardId)
        .then((request) => {
          console.log(request);
          console.log(`${boardId}번글 업데이트`);
        })
        .catch((err) => console.log(err));
    }
  };
  /** 게시글 삭제 */
  const deleteBorad = async (id: number | null) => {
    if (typeof id === 'number') {
      await boardAPI.delBorard(id);
    }
  };

  return (
    <OutDiv>
      <Link href={'/'} className="w-30 h-full">
        <GoBtn className="w-full">나가기</GoBtn>
      </Link>
      <ModalBtn>
        <Invite copyAction={handleCopyClick} createAction={creatBaseUrl} />
      </ModalBtn>
      <GoBtn
        onClick={() => {
          deleteBorad(boardId);
          const role = userId === '1' ? 'drawing' : 'solving';
          dispatch(changeRole(role));
          setStatus('gameStart');
        }}
      >
        게임시작
      </GoBtn>
    </OutDiv>
  );
}

const OutDiv = tw.div`h-full w-full flex items-center justify-between pt-1`;
const ModalBtn = tw.div`h-full w-30`;
const GoBtn = tw.button`h-full w-30 rounded-xl bg-main-green hover:bg-main-pink text-white text-3xl`;
