import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = '';

const gameModeSlice = createSlice({
  name: 'gameMode',
  initialState,
  reducers: {
    /** 모드 변경 */
    changeMode(state, action: PayloadAction<string>) {
      return action.payload;
    },
  },
});

export const { changeMode } = gameModeSlice.actions;
export default gameModeSlice.reducer;
