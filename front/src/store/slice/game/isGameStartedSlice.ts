import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const INIT_AI_GAME_DATAS = false;

const initialState = INIT_AI_GAME_DATAS;

const isGameStartedSlice = createSlice({
  name: 'isGameStarted',
  initialState,
  reducers: {
    /** 게임 시작 */
    startGame(state) {
      return true;
    },
    /** 게임 종료 */
    endGame(state) {
      return false;
    },
  },
});

export const { endGame, startGame } = isGameStartedSlice.actions;
export default isGameStartedSlice.reducer;
