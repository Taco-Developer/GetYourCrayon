import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GameUser {
  id: number;
  nickname: string;
}

const initialState: GameUser[] = [
  { id: 1, nickname: '아프리카청춘이다' },
  { id: 2, nickname: '벼랑위의당뇨' },
  { id: 3, nickname: '넌내게목욕값을줬어' },
  { id: 4, nickname: '돈들어손내놔' },
  { id: 5, nickname: '헬리콥터와마법사의똥' },
  { id: 6, nickname: '아무리생강캐도난마늘' },
];

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
      return state.filter((user) => user.id !== action.payload);
    },
  },
});

export const { addUser, deleteUser } = gameUsersSlice.actions;
export default gameUsersSlice.reducer;
