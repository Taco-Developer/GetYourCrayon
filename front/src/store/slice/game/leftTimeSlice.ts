import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: number = 1000;

const leftTimeSlice = createSlice({
  name: 'leftTime',
  initialState,
  reducers: {
    /** 카운트 다운 */
    changeTime(state, action: PayloadAction<number>) {
      return action.payload;
    },

    /** 시간 리셋 */
    resetTime(state) {
      return initialState;
    },
  },
});

export const { changeTime, resetTime } = leftTimeSlice.actions;
export default leftTimeSlice.reducer;
