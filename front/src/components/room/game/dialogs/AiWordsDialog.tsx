import React, { useState, useEffect } from 'react';
import { Dialog } from '@mui/material';

import Margin, { MarginType } from '@/components/ui/Margin';
import { useAppDispatch, useAppSelector } from '@/store/thunkhook';
import {
  addThemeList,
  closeIsSelectThemeModalOpened,
  startGame,
} from '@/store/slice/game/aiGameDatasSlice';
import { resetTime } from '@/store/slice/game/leftTimeSlice';

// 더미 파일
const INIT_THEME_LIST = [
  '과일',
  '영화',
  '드라마',
  '도시',
  '국가',
  '만화',
  '브랜드',
  '동물',
  '모름',
];

export default function AiWordsDialog() {
  const { isSelectThemeModalOpened, themeList, selectedTheme } = useAppSelector(
    (state) => state.aiGameDatas,
  );
  const dispatch = useAppDispatch();

  const [savedTheme, setSavedTheme] = useState<string>('');

  /** 카드 클릭 */
  const themeClickHandler = (clickedTheme: string) => {
    setSavedTheme((prev) => {
      if (prev === clickedTheme) return '';
      return clickedTheme;
    });
  };

  /** 선택 완료 후 시작 */
  const startClickHandler = () => {
    if (savedTheme) {
      setSavedTheme('');
      dispatch(closeIsSelectThemeModalOpened());
      dispatch(startGame());
      dispatch(resetTime());
    }
  };

  useEffect(() => {
    dispatch(addThemeList(INIT_THEME_LIST));
  }, [dispatch]);

  // 다이얼로그 닫기 함수
  const onDialogClose = (_: object, reason: string) => {
    if (reason === 'backdropClick') return;
    dispatch(closeIsSelectThemeModalOpened());
  };

  return (
    <Dialog
      open={isSelectThemeModalOpened}
      onClose={onDialogClose}
      maxWidth="md"
      fullWidth
    >
      <div className="p-8">
        <header className="text-center">
          <h2 className="text-3xl">주제</h2>
          <Margin type={MarginType.height} size={16} />
          <p className="text-xl text-gray-500">원하는 주제를 선택하세요.</p>
        </header>
        <Margin type={MarginType.height} size={16} />
        <main className="w-full grid grid-rows-3 grid-cols-3 gap-2">
          {themeList.map((theme, index) => (
            <div
              key={index}
              className={`flex justify-center items-center py-2 ${
                theme === savedTheme ? 'bg-green-600' : 'bg-orange-400'
              }`}
              onClick={() => {
                themeClickHandler(theme);
              }}
            >
              {theme}
            </div>
          ))}
        </main>
        <Margin type={MarginType.height} size={16} />
        <footer>
          <button
            className={`block mx-auto text-lg px-6 py-2 rounded-lg ${
              savedTheme ? 'bg-amber-400' : 'bg-gray-300'
            }`}
            onClick={startClickHandler}
          >
            확인
          </button>
        </footer>
      </div>
    </Dialog>
  );
}
