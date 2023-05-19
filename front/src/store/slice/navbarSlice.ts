import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AnyAction,
} from '@reduxjs/toolkit';

/**path상태를 저장할예정 */
export interface NavbarStateType {
  path: string;
}

const initialState: NavbarStateType = {
  path: '',
};

const navbarSlice = createSlice({
  name: 'navbarPath',
  initialState,
  reducers: {
    setNavbarPath: (state: NavbarStateType, action: PayloadAction<string>) => {
      state.path = action.payload;
    },
  },
});

export const { setNavbarPath } = navbarSlice.actions;

export default navbarSlice;
