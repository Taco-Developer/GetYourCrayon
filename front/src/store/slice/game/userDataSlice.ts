import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserDataType {
  userId: string;
  userRole: string;
}

const initialState: UserDataType = {
  userId: '',
  userRole: '',
};

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    /** 유저 ID 등록 */
    registerId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },

    /** 유저 역할 변경 */
    changeRole(state, action: PayloadAction<string>) {
      state.userRole = action.payload;
    },
  },
});

export const { registerId, changeRole } = userDataSlice.actions;
export default userDataSlice.reducer;
