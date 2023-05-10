import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GameRoundType {
  now: number;
  total: number;
}

const INIT_NOW = 1;
const INIT_TOTAL = 6;

const initialState: GameRoundType = {
  now: INIT_NOW,
  total: INIT_TOTAL,
};

const gameRoundSlice = createSlice({
  name: 'gameRound',
  initialState,
  reducers: {
    /** 다음 라운드 */
    goNextRound(state) {
      state.now++;
    },
  },
});

export const { goNextRound } = gameRoundSlice.actions;
export default gameRoundSlice.reducer;
