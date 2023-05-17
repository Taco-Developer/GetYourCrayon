import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GameDatasType {
  aiImages: string[];
  isScoreCheckModalOpened: boolean;
  prompt: string;
}

const initialState: GameDatasType = {
  aiImages: [],
  isScoreCheckModalOpened: false,
  prompt: '',
};

const gameDatasSlice = createSlice({
  name: 'gameDatas',
  initialState,
  reducers: {
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

    /** 프롬프트 저장 */
    savePrompt(state, action: PayloadAction<string>) {
      state.prompt = action.payload;
    },

    /** 프롬프트 리셋 */
    resetPrompt(state) {
      state.prompt = '';
    },
  },
});

export const {
  addAiImages,
  closeIsScoreCheckModalOpened,
  openIsScoreCheckModalOpened,
  resetAiImages,
  resetPrompt,
  savePrompt,
} = gameDatasSlice.actions;
export default gameDatasSlice.reducer;
