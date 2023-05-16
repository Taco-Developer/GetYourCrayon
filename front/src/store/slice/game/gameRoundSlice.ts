import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GameRoundType {
  now: number;
  total: number;
  isRoundStarted: boolean;
}

const initialState: GameRoundType = {
  now: 1,
  total: 4,
  isRoundStarted: false,
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
  },
});

export const { goNextRound, endRound, setTotalRound, startRound } =
  gameRoundSlice.actions;
export default gameRoundSlice.reducer;
