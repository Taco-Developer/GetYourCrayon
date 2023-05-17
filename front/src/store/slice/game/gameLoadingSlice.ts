import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = true;

const gameLoadingSlice = createSlice({
  name: 'gameLoading',
  initialState,
  reducers: {
    /** 게임 로딩 중 */
    startLoading(state) {
      return true;
    },

    /** 게임 로딩 종료 */
    endLoading(state) {
      return false;
    },
  },
});

export const { endLoading, startLoading } = gameLoadingSlice.actions;
export default gameLoadingSlice.reducer;
