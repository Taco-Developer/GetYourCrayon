import React, { useState } from 'react';
import { Dialog } from '@mui/material';
import Margin from '@/components/ui/Margin';

const INIT_KEY_WORDS = [
  '사과',
  '복숭아',
  '토마토',
  '키위',
  '파인애플',
  '망고',
  '두리안',
  '배',
  '귤',
];

export default function AiWordsDialog({
  isOpened,
  keywordList,
  addKeyword,
  deleteKeyword,
  onClose,
}: {
  isOpened: boolean;
  keywordList: string[];
  addKeyword: (keyword: string) => void;
  deleteKeyword: (keyword: string) => void;
  onClose: () => void;
}) {
  const onDialogClose = (_: object, reason: string) => {
    if (reason === 'backdropClick') return;
    onClose();
  };

  const cardClickHandler = (keyword: string) => {
    const isSlected = keywordList.indexOf(keyword) !== -1 ? true : false;
    if (isSlected) {
      deleteKeyword(keyword);
      return;
    }
    addKeyword(keyword);
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
          {INIT_KEY_WORDS.map((word, index) => (
            <div
              key={index}
              className={`flex justify-center items-center py-2 ${
                keywordList.indexOf(word) !== -1
                  ? 'bg-green-600'
                  : 'bg-orange-400'
              }`}
              onClick={() => {
                cardClickHandler(word);
              }}
            >
              {word}
            </div>
          ))}
        </main>
        <Margin type="height" size={16} />
        <footer>
          <button
            className={`block mx-auto text-lg px-6 py-2 rounded-lg ${
              keywordList.length === 3 ? 'bg-amber-400' : 'bg-gray-300'
            }`}
            onClick={onClose}
          >
            확인
          </button>
        </footer>
      </div>
    </Dialog>
  );
}
