import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = 20;

const leftTimeSlice = createSlice({
  name: 'leftTime',
  initialState,
  reducers: {
    /** 시간 변경 */
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
