import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GameRoundType {
  now: number;
  total: number;
  isRoundStarted: boolean;
  winnerIdx: number;
}

const initialState: GameRoundType = {
  now: 1,
  total: 100,
  isRoundStarted: false,
  winnerIdx: 0,
};

const gameRoundSlice = createSlice({
  name: 'gameRound',
  initialState,
  reducers: {
    /** 총 라운드 설정 */
    setTotalRound(state, action: PayloadAction<number>) {
      state.total = action.payload;
    },

    /** 다음 라운드 */
    goNextRound(state) {
      state.now += 1;
    },

    /** 라운드 시작 */
    startRound(state) {
      state.isRoundStarted = true;
    },

    /** 라운드 종료 */
    endRound(state) {
      state.isRoundStarted = false;
    },

    setWinner(state, action: PayloadAction<number>) {
      state.winnerIdx = action.payload;
    },

    resetRound(state) {
      state.now = 1;
    },
  },
});

export const {
  goNextRound,
  endRound,
  setTotalRound,
  startRound,
  setWinner,
  resetRound,
} = gameRoundSlice.actions;
export default gameRoundSlice.reducer;
