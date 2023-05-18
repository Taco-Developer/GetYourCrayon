import React, { useEffect } from 'react';

import { Dialog } from '@mui/material';

import Margin, { MarginType } from '@/components/ui/Margin';

import { useAppDispatch, useAppSelector } from '@/store/thunkhook';
import {
  closeIsScoreCheckModalOpened,
  resetGameDatas,
} from '@/store/slice/game/gameDatasSlice';
import { goNextRound, setWinner } from '@/store/slice/game/gameRoundSlice';
import { resetAnswer } from '@/store/slice/game/answersSlice';
import { resetTheme } from '@/store/slice/game/gameThemeSlice';
import { sendMessage } from '@/socket/messageSend';
import { changeRole } from '@/store/slice/game/userRoleSlice';

export default function EndRoundDialog({ socket }: { socket: WebSocket }) {
  const {
    score: { defaultScore, winnerScore },
    gameRound: { now, total, winnerIdx },
    gameDatas: { isScoreCheckModalOpened, prompt },
    gameUsers,
    userInfo: { userIdx },
    roomInfo: { adminUserIdx },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isScoreCheckModalOpened) return;

    const timer = setTimeout(() => {
      dispatch(resetAnswer());
      dispatch(resetGameDatas());
      dispatch(resetTheme());
      dispatch(setWinner(0));
      dispatch(closeIsScoreCheckModalOpened());
      dispatch(changeRole(''));
      if (now < total) {
        dispatch(goNextRound());
        return;
      }
      if (userIdx === adminUserIdx) {
        sendMessage(socket, 'gameAlert', { status: 'gameEnd' });
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [
    dispatch,
    now,
    total,
    isScoreCheckModalOpened,
    socket,
    adminUserIdx,
    userIdx,
  ]);

  return (
    <Dialog open={isScoreCheckModalOpened} maxWidth="xs" fullWidth>
      <div className="p-8">
        <header className="text-center">
          <h2 className=" text-3xl">라운드 종료</h2>
          <Margin type={MarginType.height} size={16} />
          <p className="text-xl text-amber-300">
            총점 :
            {gameUsers.find((user) => user.userIdx === userIdx)?.userScore}점
          </p>
        </header>
        <Margin type={MarginType.height} size={16} />
        <main className="w-full felx flex-col items-center text-center">
          <h3 className="text-2xl">이번 라운드 획득 점수</h3>
          <Margin type={MarginType.height} size={16} />
          <h1 className="text-4xl text-green-600">
            {userIdx === winnerIdx ? winnerScore + defaultScore : defaultScore}
            점
          </h1>
          <Margin type={MarginType.height} size={32} />
          <h2 className="text-3xl">AI 제작 문장</h2>
          <Margin type={MarginType.height} size={16} />
          <p>{prompt}</p>
        </main>
      </div>
    </Dialog>
  );
}
