import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AiGameDatasType {
  themeList: string[];
  selectedTheme: string;
  randomAnswers: string[];
  inputedAnswers: string[];
  aiImages: string[];
  isSelectThemeModalOpened: boolean;
  isScoreCheckModalOpened: boolean;
  isGameStarted: boolean;
}

const INIT_AI_GAME_DATAS: AiGameDatasType = {
  themeList: [],
  aiImages: [],
  randomAnswers: [],
  inputedAnswers: [],
  selectedTheme: '',
  isScoreCheckModalOpened: false,
  isSelectThemeModalOpened: false,
  isGameStarted: false,
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

    /** 게임 시작 */
    startGame(state) {
      state.isGameStarted = true;
    },
    /** 게임 종료 */
    endGame(state) {
      state.isGameStarted = false;
    },

    /** 테마 목록 추가 */
    addThemeList(state, action: PayloadAction<string[]>) {
      state.themeList = action.payload;
    },

    /** 선택된 테마 저장 */
    saveSelectedTheme(state, action: PayloadAction<string>) {
      state.selectedTheme = action.payload;
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
  },
});

export const {
  addAiImages,
  addInputedAnswers,
  addRandomAnswers,
  addThemeList,
  closeIsScoreCheckModalOpened,
  closeIsSelectThemeModalOpened,
  openIsScoreCheckModalOpened,
  openIsSelectThemeModalOpened,
  saveSelectedTheme,
  endGame,
  startGame,
} = aiGameDatasSlice.actions;
export default aiGameDatasSlice.reducer;
