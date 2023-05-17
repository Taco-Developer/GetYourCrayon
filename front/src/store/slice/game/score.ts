import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ScoreType {
  winnerScore: number;
  defaultScore: number;
}

const initialState: ScoreType = {
  winnerScore: 0,
  defaultScore: 0,
};

const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    /** 기본 점수 등록 */
    setDefaultScore(state, action: PayloadAction<number>) {
      state.defaultScore = action.payload;
    },

    /** 승리 점수 등록 */
    setWinnerScore(state, action: PayloadAction<number>) {
      state.winnerScore = action.payload;
    },
  },
});

export const { setDefaultScore, setWinnerScore } = scoreSlice.actions;
export default scoreSlice.reducer;
