import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: number = 60;

const leftTimeSlice = createSlice({
  name: 'leftTime',
  initialState,
  reducers: {
    /** 카운트 다운 */
    countDown(state) {
      return (state -= 1);
    },

    /** 시간 리셋 */
    resetTime(state) {
      return initialState;
    },
  },
});

export const { countDown, resetTime } = leftTimeSlice.actions;
export default leftTimeSlice.reducer;
