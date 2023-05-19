import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AnyAction,
} from '@reduxjs/toolkit';

/**유저상태를 저장 */
export interface UserStateType {
  userIdx: number;
  userNickname: string;
  userPoint: number;
  userProfile: string;
}

const initialState: UserStateType = {
  userIdx: 0,
  userNickname: '',
  userPoint: 0,
  userProfile: '',
};

const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUser: (state: UserStateType, action: PayloadAction<UserStateType>) => {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice;
