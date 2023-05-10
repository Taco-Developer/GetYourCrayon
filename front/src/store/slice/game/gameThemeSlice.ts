import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const INIT_THEME = '과일';

const initialState: string = 'INIT_THEME';

const gameThemeSlice = createSlice({
  name: 'gameTheme',
  initialState,
  reducers: {
    /** 테마 변경 */
    changeTheme(state, action: PayloadAction<string>) {
      state = action.payload;
    },
  },
});

export const { changeTheme } = gameThemeSlice.actions;
export default gameThemeSlice.reducer;
