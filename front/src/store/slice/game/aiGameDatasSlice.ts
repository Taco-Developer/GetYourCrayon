import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AiGameDatasType {
  randomAnswers: string[];
  inputedAnswers: string[];
  aiImages: string[];
  isSelectThemeModalOpened: boolean;
  isScoreCheckModalOpened: boolean;
}

const INIT_AI_GAME_DATAS: AiGameDatasType = {
  aiImages: [],
  randomAnswers: [],
  inputedAnswers: [],
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

    /** 랜덤 정답 추가 */
    addRandomAnswers(state, action: PayloadAction<string[]>) {
      state.randomAnswers = action.payload;
    },

    /** 정답 입력 */
    addInputedAnswers(state, action: PayloadAction<string>) {
      state.inputedAnswers.push(action.payload);
    },

    /** 정답 초기화 */
    resetAnserwer(state) {
      state.randomAnswers = [];
      state.inputedAnswers = [];
    },
  },
});

export const {
  addAiImages,
  addInputedAnswers,
  addRandomAnswers,
  closeIsScoreCheckModalOpened,
  closeIsSelectThemeModalOpened,
  openIsScoreCheckModalOpened,
  openIsSelectThemeModalOpened,
  resetAnserwer,
} = aiGameDatasSlice.actions;
export default aiGameDatasSlice.reducer;
