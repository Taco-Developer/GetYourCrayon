import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: number = 0;

const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    /** 점수 증가 */
    increase(state, action: PayloadAction<number>) {
      state += action.payload;
    },

    /** 점수 감소 */
    decrease(state, action: PayloadAction<number>) {
      state -= action.payload;
    },
  },
});

export const { increase, decrease } = scoreSlice.actions;
export default scoreSlice.reducer;
