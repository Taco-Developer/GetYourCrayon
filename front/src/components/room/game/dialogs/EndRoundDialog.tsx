import React from 'react';

import { Dialog } from '@mui/material';
import Margin from '@/components/ui/Margin';
import { useAppDispatch, useAppSelector } from '@/store/thunkhook';
import {
  closeRoundEndModal,
  goNextRound,
  openRoundStartModal,
} from '@/store/slice/inGameSlice';

export default function EndRoundDialog() {
  const { score, isRoundEndModalOpened, leftTime, gameRound } = useAppSelector(
    (state) => state.inGame,
  );
  const dispatch = useAppDispatch();

  const onDialogClose = () => {
    dispatch(closeRoundEndModal());
    if (gameRound.now < gameRound.total) {
      dispatch(openRoundStartModal());
      dispatch(goNextRound());
    }
  };

  return (
    <Dialog
      open={isRoundEndModalOpened}
      onClose={onDialogClose}
      maxWidth="xs"
      fullWidth
    >
      <div className="p-8">
        <header className="text-center">
          <h2 className=" text-3xl">라운드 종료</h2>
          <Margin type="height" size={16} />
          <p className="text-xl text-amber-300">총점 : {score}점</p>
        </header>
        <Margin type="height" size={16} />
        <main className="w-full felx flex-col items-center text-center">
          <h3 className="text-2xl">이번 라운드 획득 점수</h3>
          <Margin type="height" size={16} />
          <h1 className="text-4xl text-green-600">{leftTime > 0 ? 20 : 0}점</h1>
        </main>
      </div>
    </Dialog>
  );
}
