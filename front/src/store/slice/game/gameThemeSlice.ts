import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GameThemeType {
  themeList: string[];
  selectedTheme: string;
}

const INIT_AI_GAME_DATAS: GameThemeType = {
  themeList: [],
  selectedTheme: '',
};

const initialState = INIT_AI_GAME_DATAS;

const gameThemeSlice = createSlice({
  name: 'gameTheme',
  initialState,
  reducers: {
    /** 테마 목록 추가 */
    addThemeList(state, action: PayloadAction<string[]>) {
      state.themeList = action.payload;
    },

    /** 선택된 테마 저장 */
    saveSelectedTheme(state, action: PayloadAction<string>) {
      state.selectedTheme = action.payload;
    },

    /** 테마 초기화 */
    resetTheme(state) {
      return initialState;
    },
  },
});

export const { addThemeList, saveSelectedTheme } = gameThemeSlice.actions;
export default gameThemeSlice.reducer;
