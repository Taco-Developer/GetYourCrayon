import React, { useState, useEffect } from 'react';
import tw from 'tailwind-styled-components';
import Link from 'next/link';
import Invite from './Invite';

import { gameAPI, boardAPI } from '@/api/api';

import { useAppDispatch, useAppSelector } from '@/store/thunkhook';
import { setRoomIdx } from '@/store/slice/game/gameRoom';

import { sendMessage } from '@/socket/messageSend';

interface ReadyProps {
  boardId: number | null;
  setBoardId: React.Dispatch<React.SetStateAction<number | null>>;
  closeSocket: () => void;
  socket: WebSocket | null;
}

export default function ReadyBtn({
  boardId,
  setBoardId,
  closeSocket,
  socket,
}: ReadyProps) {
  const dispatch = useAppDispatch();
  const { roomInfo, userInfo } = useAppSelector((state) => state);
  const { roomIdx } = useAppSelector((state) => state.roomIdx);
  console.log(`접속유저: ${userInfo.userIdx} / 방장: ${roomInfo.adminUserIdx}`);
  const [btnAdmin, setBtnAdmin] = useState<boolean>(true);

  /** 게임방 나가기 api */
  const gameOut = async () => {
    await gameAPI
      .outRoom()
      .then((request) => console.log(request.data))
      .catch((err) => console.log(err));
    dispatch(setRoomIdx({ roomIdx: null }));
  };

  /** url 카피하는 함수 */
  const handleCopyClick = () => {
    navigator.clipboard.writeText(
      `https://getyourcrayon.co.kr/room/${roomIdx}`,
    );
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
      await boardAPI.postBoard(defaultTitle, `/room/${url}`).then((request) => {
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

  useEffect(() => {
    if (userInfo.userIdx === roomInfo.adminUserIdx) {
      setBtnAdmin(false);
    }
  }, [roomInfo.adminUserIdx]);

  return (
    <OutDiv>
      <Link
        href={'/'}
        className="w-30 h-full"
        onClick={() => {
          gameOut();
          closeSocket();
        }}
      >
        <GoBtn className="w-full">나가기</GoBtn>
      </Link>
      <ModalBtn>
        <Invite copyAction={handleCopyClick} createAction={creatBaseUrl} />
      </ModalBtn>
      <GoBtn
        className={btnAdmin ? 'bg-slate-500 hover:bg-slate-500' : ''}
        disabled={btnAdmin}
        onClick={() => {
          deleteBorad(boardId);
          if (!socket) return;
          sendMessage(socket, 'gameAlert', {
            status: 'gameStart',
          });
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
