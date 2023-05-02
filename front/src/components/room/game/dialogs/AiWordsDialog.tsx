import React from 'react';
import { Dialog } from '@mui/material';
import Margin from '@/components/ui/Margin';

export default function AiWordsDialog({
  isOpened,
  onClose,
}: {
  isOpened: boolean;
  onClose: () => void;
}) {
  const onDialogClose = () => {
    onClose();
  };

  return (
    <Dialog open={isOpened} onClose={onDialogClose} maxWidth="md" fullWidth>
      <div className="p-8">
        <header className="text-center">
          <h2 className=" text-3xl">제시어</h2>
          <Margin type="height" size={16} />
          <p className="text-xl">주제 : 동물</p>
        </header>
        <Margin type="height" size={16} />
        <main className="w-full grid grid-rows-3 grid-cols-3 gap-2">
          {Array(9)
            .fill(1)
            .map((_, index) => (
              <div
                key={index}
                className="flex justify-center items-center bg-orange-400"
              >
                Card
              </div>
            ))}
        </main>
        <Margin type="height" size={16} />
        <footer>
          <button className="block mx-auto text-lg px-6 py-2 bg-amber-500 rounded-lg">
            확인
          </button>
        </footer>
      </div>
    </Dialog>
  );
}
