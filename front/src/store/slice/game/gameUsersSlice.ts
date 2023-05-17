import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GameUserType {
  userIdx: number;
  roomIdx: string;
  userNickname: string;
  userPoint: number;
  userScore: number;
  userProfile: string;
}

const initialState: GameUserType[] = [];

const gameUsersSlice = createSlice({
  name: 'gameUsers',
  initialState,
  reducers: {
    /** 참여 유저 설정 */
    setGameUsers(state, action: PayloadAction<GameUserType[]>) {
      return action.payload;
    },
  },
});

export const { setGameUsers } = gameUsersSlice.actions;
export default gameUsersSlice.reducer;
