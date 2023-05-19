import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GameThemeType {
  selectedTheme: string;
}

const INIT_AI_GAME_DATAS: GameThemeType = {
  selectedTheme: '',
};

const initialState = INIT_AI_GAME_DATAS;

const gameThemeSlice = createSlice({
  name: 'gameTheme',
  initialState,
  reducers: {
    /** 테마 저장 */
    saveTheme(state, actions: PayloadAction<string>) {
      state.selectedTheme = actions.payload;
    },

    /** 테마 초기화 */
    resetTheme(state) {
      return initialState;
    },
  },
});

export const { saveTheme, resetTheme } = gameThemeSlice.actions;
export default gameThemeSlice.reducer;
