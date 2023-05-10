import React, { useState, useEffect } from 'react';
import { Dialog } from '@mui/material';

import Margin from '@/components/ui/Margin';
import { useAppDispatch, useAppSelector } from '@/store/thunkhook';
import {
  changeCategory,
  changeKeyword,
  startRound,
} from '@/store/slice/inGameSlice';

// 더미 파일
const INIT_KEYWORDS = require('../../../../../public/dummy/dummy_ai_keyword.json');

export default function AiWordsDialog() {
  const { category, isRoundStartModalOpened, selectedKeyword } = useAppSelector(
    (state) => state.inGame,
  );
  const dispatch = useAppDispatch();

  // 키워드 리스트
  const [randomKeywords, setRandomKeywords] = useState<string[]>([]);
  // 키워드 불러오는 함수
  const loadRandomKeywords = async () => {
    setRandomKeywords(INIT_KEYWORDS);
  };

  useEffect(() => {
    loadRandomKeywords();
    dispatch(changeCategory('과일'));
  }, [dispatch]);

  // 다이얼로그 닫기 함수
  const onDialogClose = (_: object, reason: string) => {
    if (reason === 'backdropClick') return;
    dispatch(startRound());
  };

  const onStartButtonClick = () => {
    if (selectedKeyword) dispatch(startRound());
  };

  // 카드 클릭 함수
  const cardClickHandler = (keyword: string) => {
    dispatch(changeKeyword(keyword));
  };

  return (
    <Dialog
      open={isRoundStartModalOpened}
      onClose={onDialogClose}
      maxWidth="md"
      fullWidth
    >
      <div className="p-8">
        <header className="text-center">
          <h2 className="text-3xl">제시어</h2>
          <Margin type="height" size={16} />
          <p className="text-xl">주제 : {category}</p>
        </header>
        <Margin type="height" size={16} />
        <main className="w-full grid grid-rows-3 grid-cols-3 gap-2">
          {randomKeywords.map((word, index) => (
            <div
              key={index}
              className={`flex justify-center items-center py-2 ${
                selectedKeyword === word ? 'bg-green-600' : 'bg-orange-400'
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
              selectedKeyword !== '' ? 'bg-amber-400' : 'bg-gray-300'
            }`}
            onClick={onStartButtonClick}
          >
            확인
          </button>
        </footer>
      </div>
    </Dialog>
  );
}
