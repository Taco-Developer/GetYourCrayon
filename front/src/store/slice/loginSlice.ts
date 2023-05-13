import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AnyAction,
} from '@reduxjs/toolkit';

/**유저상태를 저장 */
export interface LoginStateType {
  isLogin: boolean;
}

const initialState: LoginStateType = {
  isLogin: false,
};

const loginSlice = createSlice({
  name: 'isLogin',
  initialState,
  reducers: {
    setLogin: (
      state: LoginStateType,
      action: PayloadAction<LoginStateType>,
    ) => {
      return action.payload;
    },
  },
});

export const { setLogin } = loginSlice.actions;

export default loginSlice;
