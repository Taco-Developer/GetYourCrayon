import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RoomIdxtype {
  roomIdx: string | null;
}

const initialState: RoomIdxtype = {
  roomIdx: null,
};

const gameRoomSlice = createSlice({
  name: 'roomIdx',
  initialState,
  reducers: {
    setRoomIdx: (state: RoomIdxtype, action: PayloadAction<RoomIdxtype>) => {
      return action.payload;
    },
  },
});

export const { setRoomIdx } = gameRoomSlice.actions;

export default gameRoomSlice;
