import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GameUser {
  userIdx: number;
  roomIdx: string;
  userNickname: string;
  userPoint: number;
  userScore: number;
}

const initialState: GameUser[] = [];

const gameUsersSlice = createSlice({
  name: 'gameUsers',
  initialState,
  reducers: {
    /** 유저 입장 */
    addUser(state, action: PayloadAction<GameUser>) {
      state.push(action.payload);
    },
    /** 유저 퇴장 */
    deleteUser(state, action: PayloadAction<number>) {
      return state.filter((user) => user.userIdx !== action.payload);
    },
  },
});

export const { addUser, deleteUser } = gameUsersSlice.actions;
export default gameUsersSlice.reducer;
