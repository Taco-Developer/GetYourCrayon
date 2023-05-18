import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GameDatasType {
  aiImages: string[];
  isScoreCheckModalOpened: boolean;
  prompt: string;
  selectedUserIdx: number;
}

const initialState: GameDatasType = {
  aiImages: [],
  isScoreCheckModalOpened: false,
  prompt: '',
  selectedUserIdx: 0,
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

    /** 이미지와 프롬포트 등록 */
    setImageAndPrompt(
      state,
      action: PayloadAction<{ images: string[]; prompt: string }>,
    ) {
      state.aiImages = action.payload.images;
      state.prompt = action.payload.prompt;
    },

    /** 선택된 유저(그리기) */
    setSelectedUserIdx(state, action: PayloadAction<number>) {
      state.selectedUserIdx = action.payload;
    },

    /** 저장된 데이터 초기화 (모달 제외) */
    resetGameDatas(state) {
      state.aiImages = [];
      state.prompt = '';
      state.selectedUserIdx = 0;
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
  setImageAndPrompt,
  setSelectedUserIdx,
  resetGameDatas,
} = gameDatasSlice.actions;
export default gameDatasSlice.reducer;
