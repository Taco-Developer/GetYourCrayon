import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AiGameDatasType {
  aiImages: string[];
  isSelectThemeModalOpened: boolean;
  isScoreCheckModalOpened: boolean;
}

const INIT_AI_GAME_DATAS: AiGameDatasType = {
  aiImages: [],
  isScoreCheckModalOpened: false,
  isSelectThemeModalOpened: false,
};

const initialState = INIT_AI_GAME_DATAS;

const aiGameDatasSlice = createSlice({
  name: 'aiGameDatas',
  initialState,
  reducers: {
    /** 테마 선택 모달 열기 */
    openIsSelectThemeModalOpened(state) {
      state.isSelectThemeModalOpened = true;
    },
    /** 테마 선택 모달 닫기 */
    closeIsSelectThemeModalOpened(state) {
      state.isSelectThemeModalOpened = false;
    },

    /** 점수 확인 모달 열기 */
    openIsScoreCheckModalOpened(state) {
      state.isScoreCheckModalOpened = true;
    },
    /** 점수 확인 모달 닫기 */
    closeIsScoreCheckModalOpened(state) {
      state.isScoreCheckModalOpened = false;
    },

    /** AI 이미지 추가 */
    addAiImages(state, action: PayloadAction<string[]>) {
      state.aiImages = action.payload;
    },

    /** AI 이미지 리셋 */
    resetAiImages(state) {
      state.aiImages = [];
    },
  },
});

export const {
  addAiImages,
  closeIsScoreCheckModalOpened,
  closeIsSelectThemeModalOpened,
  openIsScoreCheckModalOpened,
  openIsSelectThemeModalOpened,
  resetAiImages,
} = aiGameDatasSlice.actions;
export default aiGameDatasSlice.reducer;
