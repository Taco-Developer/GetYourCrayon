import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = 'ready';

const roomStatusSlice = createSlice({
  name: 'roomStatus',
  initialState,
  reducers: {
    changeStatus(state, action: PayloadAction<string>) {
      return action.payload;
    },
  },
});

export const { changeStatus } = roomStatusSlice.actions;
export default roomStatusSlice.reducer;
