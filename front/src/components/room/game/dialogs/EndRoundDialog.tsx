import React from 'react';

import { Dialog } from '@mui/material';
import Margin from '@/components/ui/Margin';

export default function EndRoundDialog({
  isOpened,
  totalScore,
  roundScore,
  onClose,
}: {
  isOpened: boolean;
  totalScore: number;
  roundScore: number;
  onClose: () => void;
}) {
  const onDialogClose = () => {
    onClose();
  };

  return (
    <Dialog open={isOpened} onClose={onDialogClose} maxWidth="xs" fullWidth>
      <div className="p-8">
        <header className="text-center">
          <h2 className=" text-3xl">라운드 종료</h2>
          <Margin type="height" size={16} />
          <p className="text-xl text-amber-300">총점 : {totalScore}점</p>
        </header>
        <Margin type="height" size={16} />
        <main className="w-full felx flex-col items-center text-center">
          <h3 className="text-2xl">이번 라운드 획득 점수</h3>
          <Margin type="height" size={16} />
          <h1 className="text-4xl text-green-600">{roundScore}점</h1>
        </main>
      </div>
    </Dialog>
  );
}
