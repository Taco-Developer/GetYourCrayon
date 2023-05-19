import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = '';

const userRoleSlice = createSlice({
  name: 'userRole',
  initialState,
  reducers: {
    /** 유저 역할 변경 */
    changeRole(state, action: PayloadAction<string>) {
      return action.payload;
    },
  },
});

export const { changeRole } = userRoleSlice.actions;
export default userRoleSlice.reducer;
