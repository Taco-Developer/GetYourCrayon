import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RoomInfotype {
  adminUserIdx: number | null;
  gameCategory: string | null;
  maxRound: number;
  message: string;
  nowRound: number;
  roomIdx: string;
  roomMax: number;
  roomNow: number;
  roomStatus: string | null;
  status: string;
  type: string | null;
}

const initialState: RoomInfotype = {
  adminUserIdx: 0,
  gameCategory: '',
  maxRound: 0,
  message: '',
  nowRound: 0,
  roomIdx: '',
  roomMax: 0,
  roomNow: 0,
  roomStatus: '',
  status: '',
  type: '',
};

const gameInfoSlice = createSlice({
  name: 'roomInfo',
  initialState,
  reducers: {
    setRoomInfo: (state: RoomInfotype, action: PayloadAction<RoomInfotype>) => {
      return action.payload;
    },
  },
});

export const { setRoomInfo } = gameInfoSlice.actions;

export default gameInfoSlice;
