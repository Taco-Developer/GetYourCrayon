import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GameUser {
  userIdx: number;
  roomIdx: string;
  userNickname: string;
  userPoint: number;
  userScore: number;
}

const initialState: GameUser[] = [
  {
    roomIdx: 'asdf123',
    userIdx: 1,
    userNickname: '아프리카청춘이다',
    userPoint: 0,
    userScore: 0,
  },
  {
    roomIdx: 'asdf123',
    userIdx: 2,
    userNickname: '벼랑위의당뇨',
    userPoint: 0,
    userScore: 0,
  },
  {
    roomIdx: 'asdf123',
    userIdx: 3,
    userNickname: '넌내게목욕값을줬어',
    userPoint: 0,
    userScore: 0,
  },
  {
    roomIdx: 'asdf123',
    userIdx: 4,
    userNickname: '돈들어손내놔',
    userPoint: 0,
    userScore: 0,
  },
  {
    roomIdx: 'asdf123',
    userIdx: 5,
    userNickname: '헬리콥터와마법사의똥',
    userPoint: 0,
    userScore: 0,
  },
  {
    roomIdx: 'asdf123',
    userIdx: 6,
    userNickname: '아무리생강캐도난마늘',
    userPoint: 0,
    userScore: 0,
  },
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
      return state.filter((user) => user.userIdx !== action.payload);
    },
  },
});

export const { addUser, deleteUser } = gameUsersSlice.actions;
export default gameUsersSlice.reducer;
