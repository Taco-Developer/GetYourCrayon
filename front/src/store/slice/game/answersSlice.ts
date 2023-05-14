import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AnswersType {
  savedAnswers: string[];
  inputedAnswers: string[];
}

const INIT_GAME_ANSWERS: AnswersType = {
  savedAnswers: [],
  inputedAnswers: [],
};

const initialState = INIT_GAME_ANSWERS;

const answersSlice = createSlice({
  name: 'answers',
  initialState,
  reducers: {
    /** 랜덤 정답 추가 */
    addSavedAnswers(state, action: PayloadAction<string[]>) {
      state.savedAnswers = action.payload;
    },

    /** 정답 입력 */
    addInputedAnswers(state, action: PayloadAction<string>) {
      state.inputedAnswers.push(action.payload);
    },

    /** 정답 초기화 */
    resetAnserwer(state) {
      return initialState;
    },
  },
});

export const { addInputedAnswers, addSavedAnswers, resetAnserwer } =
  answersSlice.actions;
export default answersSlice.reducer;
